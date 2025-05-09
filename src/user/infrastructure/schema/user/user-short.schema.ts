import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserShortSchema {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    username: string;

    @ApiProperty()
    @Expose()
    avatarId: number;
}
