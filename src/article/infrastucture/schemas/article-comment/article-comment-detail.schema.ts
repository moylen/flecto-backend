import { ArticleCommentSchema } from './article-comment.schema';
import { UserSchema } from '../../../../user/infrastructure/schema/user/user.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class ArticleCommentDetailSchema extends ArticleCommentSchema {
    @ApiProperty({ type: () => UserSchema })
    @Type(() => UserSchema)
    @Expose()
    creator: UserSchema;
}
