import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserShortSchema } from './user-short.schema';

export class UserSchema extends UserShortSchema {
    @ApiProperty()
    @Expose()
    email: string;

    @ApiProperty()
    @Expose()
    role: string;

    @ApiProperty()
    @Expose()
    name: string;

    @ApiProperty()
    @Expose()
    surname: string;

    @ApiProperty()
    @Expose()
    description: string;

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
