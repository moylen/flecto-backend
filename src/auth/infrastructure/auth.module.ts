import { Module } from '@nestjs/common';
import { UserModule } from '../../user/infrastructure/user.module';
import { HashService } from '../../common/domain/services/hash.service';
import { DatabaseModule } from '../../database/infrastructure/database.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from '../domain/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { WsJwtStrategy } from './strategies/ws-jwt.strategy';

@Module({
    imports: [
        DatabaseModule,
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('ACCESS_SECRET'),
                signOptions: { expiresIn: configService.get<string>('ACCESS_TOKEN_EXP') },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [HashService, AuthService, JwtStrategy, WsJwtStrategy],
})
export class AuthModule {}
