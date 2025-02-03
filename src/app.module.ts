import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/infrastructure/auth.module';
import { UserModule } from './user/infrastructure/user.module';
import { UserService } from './user/domain/services/user.service';
import { DatabaseModule } from './database/infrastructure/database.module';
import { PrismaService } from './database/infrastructure/service/prisma.service';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserModule, DatabaseModule],
    providers: [UserService, PrismaService],
})
export class AppModule {}
