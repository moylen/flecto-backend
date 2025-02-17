import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { Transform } from 'class-transformer';
import { UsernameUniqueValidator } from '../../validators/username-unique.validator';

export class UserUsernameUpdateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.toLowerCase().trim())
    @Validate(UsernameUniqueValidator)
    username: string;
}
