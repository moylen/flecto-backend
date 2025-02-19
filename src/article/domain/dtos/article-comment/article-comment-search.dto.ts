import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { PaginationDto } from '../../../../common/domain/dtos/pagination.dto';

export class ArticleCommentSearchDto extends PaginationDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    articleId: number;
}
