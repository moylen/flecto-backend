import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/infrastructure/database.module';
import { UserModule } from '../../user/infrastructure/user.module';
import { ArticleService } from '../domain/services/article/article.service';
import { ArticleController } from './controllers/article.controller';
import { ArticleLikeService } from '../domain/services/article/article-like.service';
import { ArticleViewService } from '../domain/services/article/article-view.service';
import { TagService } from '../domain/services/tag/tag.service';
import { TagController } from './controllers/tag.controller';
import { ArticleCommentService } from '../domain/services/article/article-comment.service';
import { ArticleCommentController } from './controllers/article-comment.controller';

@Module({
    imports: [DatabaseModule, UserModule],
    controllers: [ArticleController, ArticleCommentController, TagController],
    providers: [ArticleService, ArticleLikeService, ArticleViewService, ArticleCommentService, TagService],
    exports: [],
})
export class ArticleModule {}
