import { Module } from '@nestjs/common';
import { UserModule } from '../../user/infrastructure/user.module';
import { UserService } from '../../user/domain/services/user.service';
import { HashService } from '../../common/domain/services/hash.service';
import { PrismaModule } from '../../database/infrastructure/prisma.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from '../domain/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserTokenService } from '../../user/domain/services/user-token.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        PrismaModule,
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('ACCESS_SECRET'),
                signOptions: { expiresIn: configService.get<string>('ACCESS_TOKEN_EXP') },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [UserService, HashService, AuthService, UserTokenService, JwtStrategy],
})
export class AuthModule {}
