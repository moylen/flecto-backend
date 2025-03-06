import { BadRequestException, Body, Controller, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { AuthService } from '../../domain/services/auth.service';
import { RegisterDto } from '../../domain/dtos/register.dto';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../../domain/dtos/login.dto';
import { FastifyRequest, FastifyReply } from 'fastify';
import { AccessTokenSchema } from '../schemas/access-token.schema';
import { MappingInterceptor } from '../../../common/domain/interceptors/mapping.interceptor';

@ApiTags('Auth')
@UseInterceptors(new MappingInterceptor(AccessTokenSchema))
@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiBody({ type: RegisterDto })
    @ApiOkResponse({ type: AccessTokenSchema })
    @Post('/register')
    async register(@Res({ passthrough: true }) res: FastifyReply, @Body() dto: RegisterDto) {
        const [accessToken, refreshToken] = await this.authService.register(dto);
        res.setCookie('refreshToken', refreshToken, {
            httpOnly: true,
            expires: this.authService.getRefreshTokenExpireTime(),
        });
        return { accessToken };
    }

    @ApiBody({ type: LoginDto })
    @ApiOkResponse({ type: AccessTokenSchema })
    @Post('/login')
    async login(@Res({ passthrough: true }) res: FastifyReply, @Body() dto: LoginDto) {
        const [accessToken, refreshToken] = await this.authService.login(dto);
        res.setCookie('refreshToken', refreshToken, {
            httpOnly: true,
            expires: this.authService.getRefreshTokenExpireTime(),
        });
        return { accessToken };
    }

    @ApiOkResponse({ type: AccessTokenSchema })
    @Post('/refresh')
    async refresh(@Req() req: FastifyRequest) {
        if (!req.cookies.refreshToken) {
            throw new BadRequestException('Refresh token not found');
        }
        return this.authService.refresh(req.cookies.refreshToken);
    }
}
