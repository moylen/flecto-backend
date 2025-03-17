import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../../../user/domain/services/user.service';
import { HashService } from '../../../common/domain/services/hash.service';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserTokenService } from '../../../user/domain/services/user-token.service';
import { addMilliseconds } from 'date-fns';
import ms from 'ms';
import { User } from '@prisma/client';

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
        const user = await this.userService.create(dto.username, await this.hashService.hashPassword(dto.password));

        const [accessToken, refreshToken] = await this.getTokens(user);

        return [accessToken, refreshToken];
    }

    async login(dto: LoginDto): Promise<string[]> {
        const user = await this.userService.findByUsername(dto.username);

        if (!user) {
            throw new NotFoundException('Username or password is incorrect');
        }

        const isPassed = await this.hashService.verify(user.passwordHash, dto.password);

        if (!isPassed) {
            throw new NotFoundException('Username or password is incorrect');
        }

        const [accessToken, refreshToken] = await this.getTokens(user);

        return [accessToken, refreshToken];
    }

    async refresh(refreshToken: string): Promise<{ accessToken: string }> {
        const userToken = await this.userTokenService.findByRefreshToken(refreshToken);

        if (!userToken) {
            throw new BadRequestException('Invalid refresh token');
        }

        const accessToken = await this.signToken(userToken.user, this.ACCESS_OPTIONS);

        return { accessToken };
    }

    async logout(refreshToken: string): Promise<void> {
        await this.userTokenService.revoke(refreshToken);
    }

    getRefreshTokenExpireTime(): Date {
        return addMilliseconds(new Date(), ms(this.configService.get<ms.StringValue>('REFRESH_TOKEN_EXP')));
    }

    private async getTokens(user: User): Promise<string[]> {
        const [accessToken, refreshToken] = await Promise.all([
            this.signToken(user, this.ACCESS_OPTIONS),
            this.signToken(user, this.REFRESH_OPTIONS),
        ]);

        await this.userTokenService.create({
            userId: user.id,
            refreshToken,
            expireTime: this.getRefreshTokenExpireTime(),
        });

        return [accessToken, refreshToken];
    }

    private async signToken(user: User, options: JwtSignOptions): Promise<string> {
        const payload = { sub: user.id, role: user.role };
        return this.jwtService.signAsync(payload, options);
    }
}
