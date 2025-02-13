import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

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

    // @ApiProperty()
    // @Expose()
    // isLiked: boolean;
    //
    // @ApiProperty()
    // @Expose()
    // likesCount: number;
    //
    // @ApiProperty()
    // @Expose()
    // viewsCount: number;

    @ApiProperty()
    @Expose()
    createTime: Date;

    @ApiProperty()
    @Expose()
    updateTime: Date;

    @ApiProperty()
    @Expose()
    deleteTime: Date;
}
