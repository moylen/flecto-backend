import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ArticleCommentSchema {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    content: string;

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
