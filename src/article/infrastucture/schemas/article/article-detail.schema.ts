import { ArticleSchema } from './article.schema';
import { ApiProperty } from '@nestjs/swagger';
import { UserSchema } from '../../../../user/infrastructure/schema/user/user.schema';
import { Expose, Type } from 'class-transformer';
import { AuctionSchema } from '../../../../auction/infrastructure/schemas/auction/auction.schema';

export class ArticleDetailSchema extends ArticleSchema {
    @ApiProperty({ type: () => UserSchema })
    @Type(() => UserSchema)
    @Expose()
    creator: UserSchema;

    @ApiProperty({ type: () => AuctionSchema })
    @Type(() => AuctionSchema)
    @Expose()
    auction: AuctionSchema;
}
