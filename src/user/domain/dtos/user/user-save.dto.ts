import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { UserContactSaveDto } from '../user-contact/user-contact-save.dto';
import { Type } from 'class-transformer';

export class UserSaveDto {
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

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    avatarId?: number;

    @ApiProperty({ required: false, type: () => [UserContactSaveDto] })
    @IsOptional()
    @Type(() => UserContactSaveDto)
    @IsArray()
    @ValidateNested({ each: true })
    userContacts?: UserContactSaveDto[];
}
