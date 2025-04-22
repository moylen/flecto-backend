import { SearchDto } from './search.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class SortedSearchDto extends SearchDto {
    @ApiProperty({ required: false })
    @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    sort?: string[];
}
