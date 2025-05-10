import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../../../common/domain/dtos/pagination.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ChatMessageSearchDto extends PaginationDto {
    @ApiProperty()
    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    receiverId: number;
}
