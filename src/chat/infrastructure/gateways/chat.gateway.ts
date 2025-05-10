import {
    ConnectedSocket,
    MessageBody,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { ChatMessageService } from '../../domain/services/chat-message.service';
import { UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from '../../../auth/infrastructure/guards/ws-jwt-auth.guard';
import { AuthSocket } from '../interface/auth-socket';
import { Server } from 'socket.io';
import { ChatMessageCreateDto } from '../../domain/dtos/chat-message-create.dto';
import { ChatMessageUpdateDto } from '../../domain/dtos/chat-message-update.dto';
import { ChatMessageDeleteDto } from '../../domain/dtos/chat-message-delete.dto';
import { ChatMessageSchema } from '../schemas/chat-message.schema';

@UseGuards(WsJwtAuthGuard)
@WebSocketGateway({ namespace: '/chat', transports: ['websocket'] })
export class ChatGateway implements OnGatewayDisconnect {
    constructor(private readonly chatMessageService: ChatMessageService) {}

    @WebSocketServer()
    private readonly server: Server;

    private readonly connectedUsers = new Map<number, string>();

    @SubscribeMessage('send-message')
    async send(@ConnectedSocket() socket: AuthSocket, @MessageBody() dto: ChatMessageCreateDto) {
        const message = await this.chatMessageService.create(socket.context.user.id, dto);
        this.emit('receive-message', message, [socket.context.user.id, dto.receiverId]);
    }

    @SubscribeMessage('update-message')
    async update(@ConnectedSocket() socket: AuthSocket, @MessageBody() dto: ChatMessageUpdateDto) {
        const message = await this.chatMessageService.update(socket.context.user.id, dto);
        this.emit('receive-update-message', message, [socket.context.user.id, dto.receiverId]);
    }

    @SubscribeMessage('delete-message')
    async softDelete(@ConnectedSocket() socket: AuthSocket, @MessageBody() dto: ChatMessageDeleteDto) {
        const message = await this.chatMessageService.softDelete(socket.context.user.id, dto);
        this.emit('receive-delete-message', message, [socket.context.user.id, dto.receiverId]);
    }

    @SubscribeMessage('auth')
    async auth(@ConnectedSocket() socket: AuthSocket) {
        this.connectedUsers.set(socket.context.user.id, socket.id);
    }

    async handleDisconnect(socket: AuthSocket) {
        if (socket.context?.user) {
            this.connectedUsers.delete(socket.context.user.id);
        }
    }

    private emit(event: string, message: ChatMessageSchema, userIds: number[]): void {
        const socketIds = userIds.map((userId) => this.connectedUsers.get(userId)).filter(Boolean);
        this.server.to(socketIds).emit(event, message);
    }
}
