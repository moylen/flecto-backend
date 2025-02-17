import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { TagSchema } from '../tag/tag.schema';

export class ArticleSchema {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    title: string;

    @ApiProperty()
    @Expose()
    slug: string;

    @ApiProperty()
    @Expose()
    description: string;

    @ApiProperty()
    @Expose()
    isLiked: boolean;

    @ApiProperty()
    @Expose()
    likesCount: number;

    @ApiProperty()
    @Expose()
    viewsCount: number;

    @ApiProperty()
    @Expose()
    createTime: Date;

    @ApiProperty()
    @Expose()
    updateTime: Date;

    @ApiProperty()
    @Expose()
    deleteTime: Date;

    @ApiProperty({ type: () => [TagSchema] })
    @Type(() => TagSchema)
    @Transform(({ obj }) => obj.articleTags?.map((item: any) => item.tag))
    @Expose()
    articleTags: TagSchema[];
}
