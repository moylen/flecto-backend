import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserEmailUpdateDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    newEmail: string;
}
