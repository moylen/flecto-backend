import { ArticleWithComputedSchema } from './article-with-computed.schema';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ArticleWithTotalSchema {
    @ApiProperty()
    @Expose()
    total: number;

    @ApiProperty({ type: () => [ArticleWithComputedSchema] })
    @Type(() => ArticleWithComputedSchema)
    @Expose()
    items: ArticleWithComputedSchema[];
}
