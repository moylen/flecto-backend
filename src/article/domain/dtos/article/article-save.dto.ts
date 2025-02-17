import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
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

    @ApiProperty({ required: false, type: () => [TagSaveDto] })
    @IsOptional()
    @Type(() => TagSaveDto)
    @IsArray()
    @ValidateNested({ each: true })
    articleTags?: TagSaveDto[];
}
