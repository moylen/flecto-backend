import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/infrastructure/auth.module';
import { UserModule } from './user/infrastructure/user.module';
import { DatabaseModule } from './database/infrastructure/database.module';
import { FileModule } from './file/infrastructure/file.module';
import { ArticleModule } from './article/infrastucture/article.module';
import { ChatModule } from './chat/infrastructure/chat.module';
import { AuctionModule } from './auction/infrastructure/auction.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ScheduleModule.forRoot(),
        AuthModule,
        UserModule,
        DatabaseModule,
        FileModule,
        ArticleModule,
        ChatModule,
        AuctionModule,
    ],
})
export class AppModule {}
