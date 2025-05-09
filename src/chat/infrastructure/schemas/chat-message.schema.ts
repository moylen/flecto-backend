import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserShortSchema } from '../../../user/infrastructure/schema/user/user-short.schema';

export class ChatMessageSchema {
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

    @ApiProperty({ type: () => UserShortSchema })
    @Type(() => UserShortSchema)
    @Expose()
    sender: UserShortSchema;

    @ApiProperty({ type: () => UserShortSchema })
    @Type(() => UserShortSchema)
    @Expose()
    receiver: UserShortSchema;
}
