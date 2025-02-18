import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../../../common/domain/dtos/pagination.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ChatMessageSearchDto extends PaginationDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    receiverId: number;
}
