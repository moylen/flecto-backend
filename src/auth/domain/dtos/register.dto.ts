import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { Transform } from 'class-transformer';
import { UsernameUniqueValidator } from '../../../user/domain/validators/username-unique.validator';

export class RegisterDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.toLowerCase().trim())
    @Validate(UsernameUniqueValidator)
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}
