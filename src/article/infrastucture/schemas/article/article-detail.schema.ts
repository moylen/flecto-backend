import { ApiProperty } from '@nestjs/swagger';
import { UserSchema } from '../../../../user/infrastructure/schema/user/user.schema';
import { Expose, Type } from 'class-transformer';
import { AuctionSchema } from '../../../../auction/infrastructure/schemas/auction/auction.schema';
import { ArticleWithComputedSchema } from './article-with-computed.schema';

export class ArticleDetailSchema extends ArticleWithComputedSchema {
    @ApiProperty({ type: () => UserSchema })
    @Type(() => UserSchema)
    @Expose()
    creator: UserSchema;

    @ApiProperty({ type: () => AuctionSchema })
    @Type(() => AuctionSchema)
    @Expose()
    auction: AuctionSchema;
}
