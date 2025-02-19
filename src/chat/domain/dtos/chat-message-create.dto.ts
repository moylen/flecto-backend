import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ChatMessageCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    receiverId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    content: string;
}
