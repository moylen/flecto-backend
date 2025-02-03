import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UserUsernameUpdateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.toLowerCase())
    newUsername: string;
}
