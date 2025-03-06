import { ArticleSchema } from './article.schema';
import { ApiProperty } from '@nestjs/swagger';
import { UserSchema } from '../../../../user/infrastructure/schema/user/user.schema';
import { Expose, Type } from 'class-transformer';

export class ArticleDetailSchema extends ArticleSchema {
    @ApiProperty({ type: () => UserSchema })
    @Type(() => UserSchema)
    @Expose()
    creator: UserSchema;
}
