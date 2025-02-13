import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    query?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    page?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    pageSize?: number;
}
