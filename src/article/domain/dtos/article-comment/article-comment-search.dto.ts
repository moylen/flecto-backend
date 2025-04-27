import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { PaginationDto } from '../../../../common/domain/dtos/pagination.dto';
import { Type } from 'class-transformer';

export class ArticleCommentSearchDto extends PaginationDto {
    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    articleId: number;
}
