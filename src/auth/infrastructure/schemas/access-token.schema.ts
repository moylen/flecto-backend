import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AccessTokenSchema {
    @Expose()
    @ApiProperty()
    accessToken: string;
}
