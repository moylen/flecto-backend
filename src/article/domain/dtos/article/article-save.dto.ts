import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TagSaveDto } from '../tag/tag-save.dto';

export class ArticleSaveDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber({}, { each: true })
    fileIds?: number[];

    @ApiProperty({ required: false, type: () => [TagSaveDto] })
    @IsOptional()
    @Type(() => TagSaveDto)
    @IsArray()
    @ValidateNested({ each: true })
    tags?: TagSaveDto[];
}
