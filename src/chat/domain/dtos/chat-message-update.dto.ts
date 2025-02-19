import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ChatMessageDeleteDto } from './chat-message-delete.dto';

export class ChatMessageUpdateDto extends ChatMessageDeleteDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    content: string;
}
