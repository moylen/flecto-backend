import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, Validate, ValidateNested } from 'class-validator';
import { UserContactSaveDto } from '../user-contact/user-contact-save.dto';
import { Transform, Type } from 'class-transformer';
import { UsernameUniqueValidator } from '../../validators/username-unique.validator';

export class UserSaveDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.toLowerCase().trim())
    @Validate(UsernameUniqueValidator)
    username?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    surname?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ required: false, type: () => [UserContactSaveDto] })
    @IsOptional()
    @Type(() => UserContactSaveDto)
    @IsArray()
    @ValidateNested({ each: true })
    userContacts?: UserContactSaveDto[];
}
