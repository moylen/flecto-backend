import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserConfirmEmailDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    code: string;
}
