import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/infrastructure/database.module';
import { UserModule } from '../../user/infrastructure/user.module';
import { ArticleService } from '../domain/services/article.service';
import { ArticleController } from './controllers/article.controller';
import { ArticleLikeService } from '../domain/services/article-like.service';
import { ArticleViewService } from '../domain/services/article-view.service';

@Module({
    imports: [DatabaseModule, UserModule],
    controllers: [ArticleController],
    providers: [ArticleService, ArticleLikeService, ArticleViewService],
    exports: [ArticleService, ArticleLikeService, ArticleViewService],
})
export class ArticleModule {}
