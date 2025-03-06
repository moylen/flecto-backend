import { Module } from '@nestjs/common';
import { ChatGateway } from './gateways/chat.gateway';
import { DatabaseModule } from '../../database/infrastructure/database.module';
import { ChatMessageService } from '../domain/services/chat-message.service';
import { ChatMessageController } from './controllers/chat-message.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [ChatMessageController],
    providers: [ChatGateway, ChatMessageService],
    exports: [],
})
export class ChatModule {}
