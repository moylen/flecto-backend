import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ArticleCommentUpdateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    content: string;
}
