import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TagSaveDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;
}
