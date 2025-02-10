import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.toLowerCase().trim())
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}
