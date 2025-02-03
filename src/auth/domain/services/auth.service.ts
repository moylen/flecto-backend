import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../../../user/domain/services/user.service';
import { HashService } from '../../../common/domain/services/hash.service';
import { RegisterDto } from '../dtos/register.dto';
import { User } from '@prisma/client';
import { LoginDto } from '../dtos/login.dto';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserTokenService } from '../../../user/domain/services/user-token.service';
import { addMilliseconds } from 'date-fns';
import { AccessTokenSchema } from '../dtos/access-token.schema';
import ms from 'ms';

@Injectable()
export class AuthService {
    constructor(
        private readonly hashService: HashService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly userTokenService: UserTokenService,
    ) {}

    private readonly ACCESS_OPTIONS: JwtSignOptions = {
        secret: this.configService.get<string>('ACCESS_SECRET'),
        expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXP'),
    };

    private readonly REFRESH_OPTIONS: JwtSignOptions = {
        secret: this.configService.get<string>('REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXP'),
    };

    async register(dto: RegisterDto): Promise<string[]> {
        const duplicate = await this.userService.findByUsername(dto.username);

        if (duplicate) {
            throw new BadRequestException('User with this username already exists');
        }

        const user = await this.userService.create(dto.username, await this.hashService.hashPassword(dto.password));

        const [accessToken, refreshToken] = await this.getTokens(user);

        return [accessToken, refreshToken];
    }

    async login(dto: LoginDto): Promise<string[]> {
        const user = await this.userService.findByUsername(dto.username);

        if (!user) {
            throw new NotFoundException('User with this username not found');
        }

        const isPassed = await this.hashService.verify(user.passwordHash, dto.password);

        if (!isPassed) {
            throw new BadRequestException('Username or password is wrong');
        }

        const [accessToken, refreshToken] = await this.getTokens(user);

        return [accessToken, refreshToken];
    }

    async refresh(refreshToken: string): Promise<AccessTokenSchema> {
        const userToken = await this.userTokenService.findByRefreshToken(refreshToken);

        if (!userToken) {
            throw new BadRequestException('Invalid refresh token');
        }

        const accessToken = await this.signToken(userToken.user, this.ACCESS_OPTIONS);

        return { accessToken };
    }

    private async getTokens(user: User) {
        const [accessToken, refreshToken] = await Promise.all([
            this.signToken(user, this.ACCESS_OPTIONS),
            this.signToken(user, this.REFRESH_OPTIONS),
        ]);

        await this.userTokenService.create(
            user.id,
            refreshToken,
            addMilliseconds(new Date(), ms(this.configService.get<ms.StringValue>('REFRESH_TOKEN_EXP'))),
        );

        return [accessToken, refreshToken];
    }

    private async signToken(user: User, options: JwtSignOptions): Promise<string> {
        const payload = { sub: user.id, role: user.role };
        return await this.jwtService.signAsync(payload, options);
    }
}
