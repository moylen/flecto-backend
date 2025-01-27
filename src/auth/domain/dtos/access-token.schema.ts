import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenSchema {
    @ApiProperty()
    accessToken: string;
}
