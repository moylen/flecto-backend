import { AuctionSchema } from './auction.schema';
import { AuctionHistorySchema } from '../auction-history/auction-history.schema';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AuctionDetailSchema extends AuctionSchema {
    @ApiProperty({ type: () => [AuctionHistorySchema] })
    @Type(() => AuctionHistorySchema)
    @Expose()
    history: AuctionHistorySchema[];
}
