import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { UserContactSaveDto } from '../user-contact/user-contact-save.dto';
import { Type } from 'class-transformer';

export class UserSaveDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    surname?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        type: [UserContactSaveDto],
        isArray: true,
    })
    @IsOptional()
    @Type(() => UserContactSaveDto)
    @IsArray()
    @ValidateNested({ each: true })
    userContacts?: UserContactSaveDto[];
}
