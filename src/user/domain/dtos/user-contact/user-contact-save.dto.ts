import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class UserContactSaveDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    id?: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUrl({ require_protocol: false })
    link: string;
}
