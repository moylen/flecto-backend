import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/infrastructure/auth.module';
import { UserModule } from './user/infrastructure/user.module';
import { DatabaseModule } from './database/infrastructure/database.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserModule, DatabaseModule],
})
export class AppModule {}
