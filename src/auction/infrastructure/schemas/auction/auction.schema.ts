import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AuctionSchema {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    creatorId: number;

    @ApiProperty()
    @Expose()
    articleId: number;

    @ApiProperty()
    @Expose()
    startPrice: number;

    @ApiProperty()
    @Expose()
    stepPrice: number;

    @ApiProperty()
    @Expose()
    currentPrice: number;

    @ApiProperty()
    @Expose()
    isOver: boolean;

    @ApiProperty()
    @Expose()
    untilTime: Date;

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
