import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/infrastructure/database.module';
import { UserModule } from '../../user/infrastructure/user.module';
import { ArticleService } from '../domain/services/article.service';
import { ArticleController } from './controllers/article.controller';

@Module({
    imports: [DatabaseModule, UserModule],
    controllers: [ArticleController],
    providers: [ArticleService],
    exports: [ArticleService],
})
export class ArticleModule {}
