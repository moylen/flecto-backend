import { AuctionAction } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserSchema } from '../../../../user/infrastructure/schema/user/user.schema';

export class AuctionHistorySchema {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty({ enum: AuctionAction })
    @Expose()
    action: AuctionAction;

    @ApiProperty()
    @Expose()
    isSystem: boolean;

    @ApiProperty()
    @Expose()
    createTime: Date;

    @ApiProperty({ type: () => UserSchema })
    @Type(() => UserSchema)
    @Expose()
    user?: UserSchema;
}
