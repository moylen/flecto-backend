import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserSchema {
    @Expose()
    @ApiProperty()
    id: number;

    @Expose()
    @ApiProperty()
    username: string;

    @Expose()
    @ApiProperty()
    email: string;

    @Expose()
    @ApiProperty()
    role: string;

    @Expose()
    @ApiProperty()
    name: string;

    @Expose()
    @ApiProperty()
    surname: string;

    @Expose()
    @ApiProperty()
    description: string;

    @Expose()
    @ApiProperty()
    createTime: Date;

    @Expose()
    @ApiProperty()
    updateTime: Date;

    @Expose()
    @ApiProperty()
    deleteTime: Date;
}
