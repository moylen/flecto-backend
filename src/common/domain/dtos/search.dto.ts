import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class SearchDto extends PaginationDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    query?: string;
}
