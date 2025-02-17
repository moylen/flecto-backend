import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/infrastructure/database.module';
import { UserModule } from '../../user/infrastructure/user.module';
import { ArticleService } from '../domain/services/article/article.service';
import { ArticleController } from './controllers/article.controller';
import { ArticleLikeService } from '../domain/services/article/article-like.service';
import { ArticleViewService } from '../domain/services/article/article-view.service';
import { TagService } from '../domain/services/tag/tag.service';
import { TagController } from './controllers/tag.controller';

@Module({
    imports: [DatabaseModule, UserModule],
    controllers: [ArticleController, TagController],
    providers: [ArticleService, ArticleLikeService, ArticleViewService, TagService],
    exports: [ArticleService, ArticleLikeService, ArticleViewService, TagService],
})
export class ArticleModule {}
