import { AuctionAction } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AuctionHistorySchema {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    auctionId: number;

    @ApiProperty()
    @Expose()
    userId: number;

    @ApiProperty({ enum: AuctionAction })
    @Expose()
    action: AuctionAction;

    @ApiProperty()
    @Expose()
    isSystem: boolean;

    @ApiProperty()
    @Expose()
    createTime: number;
}
