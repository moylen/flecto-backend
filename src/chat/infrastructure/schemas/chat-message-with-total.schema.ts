import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ChatMessageSchema } from './chat-message.schema';

export class ChatMessageWithTotalSchema {
    @ApiProperty()
    @Expose()
    total: number;

    @ApiProperty({ type: () => [ChatMessageSchema] })
    @Type(() => ChatMessageSchema)
    @Expose()
    items: ChatMessageSchema[];
}
