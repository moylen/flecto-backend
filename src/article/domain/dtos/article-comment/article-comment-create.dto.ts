import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ArticleCommentUpdateDto } from './article-comment-update.dto';

export class ArticleCommentCreateDto extends ArticleCommentUpdateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    articleId: number;
}
