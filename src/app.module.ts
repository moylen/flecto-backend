import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/infrastructure/auth.module';
import { UserModule } from './user/infrastructure/user.module';
import { UserService } from './user/domain/services/user.service';
import { PrismaModule } from './database/infrastructure/prisma.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserModule, PrismaModule],
    providers: [UserService],
})
export class AppModule {}
