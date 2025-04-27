import { ArticleCommentDetailSchema } from './article-comment-detail.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class ArticleCommentWithTotal {
    @ApiProperty()
    @Expose()
    total: number;

    @ApiProperty({ type: () => [ArticleCommentDetailSchema] })
    @Type(() => ArticleCommentDetailSchema)
    @Expose()
    items: ArticleCommentDetailSchema[];
}
