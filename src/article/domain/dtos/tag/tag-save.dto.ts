import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class TagSaveDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.toLowerCase().trim())
    title: string;
}
