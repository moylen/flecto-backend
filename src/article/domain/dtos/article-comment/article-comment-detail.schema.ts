import { ArticleCommentSchema } from './article-comment.schema';
import { UserSchema } from '../../../../user/domain/dtos/user/user.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class ArticleCommentDetailSchema extends ArticleCommentSchema {
    @ApiProperty({ type: () => UserSchema })
    @Type(() => UserSchema)
    @Expose()
    creator: UserSchema;
}
