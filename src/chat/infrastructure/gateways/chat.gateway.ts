import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { ChatMessageService } from '../../domain/services/chat-message.service';
import { ChatMessageSaveDto } from '../../domain/dtos/chat-message-save.dto';
import { UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from '../../../auth/infrastructure/guards/ws-jwt-auth.guard';
import { AuthSocket } from '../interface/auth-socket';
import { Server } from 'socket.io';

@UseGuards(WsJwtAuthGuard)
@WebSocketGateway({ namespace: '/chat', transports: ['websocket'] })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly chatMessageService: ChatMessageService) {}

    @WebSocketServer()
    private readonly server: Server;

    private readonly connectedUsers = new Map<number, string>();

    @SubscribeMessage('send-message')
    async send(@ConnectedSocket() socket: AuthSocket, @MessageBody() dto: ChatMessageSaveDto) {
        const message = await this.chatMessageService.create(socket.context.user.id, dto);
        this.emitOrSkip('receive-message', message);
    }

    @SubscribeMessage('edit-message')
    async edit(@ConnectedSocket() socket: AuthSocket, @MessageBody() dto: ChatMessageSaveDto) {
        const message = await this.chatMessageService.update(socket.context.user.id, dto);
        this.emitOrSkip('receive-edit-message', message);
    }

    @SubscribeMessage('delete-message')
    async softDelete(@ConnectedSocket() socket: AuthSocket, @MessageBody() dto: ChatMessageSaveDto) {
        const message = await this.chatMessageService.softDelete(socket.context.user.id, dto);
        this.emitOrSkip('receive-delete-message', message);
    }

    // TODO: Method executing before guard, need to find another way to set user
    async handleConnection(socket: AuthSocket) {
        this.connectedUsers.set(socket.context.user.id, socket.id);
    }

    async handleDisconnect(socket: AuthSocket) {
        this.connectedUsers.delete(socket.context.user.id);
    }

    private emitOrSkip(event: string, dto: ChatMessageSaveDto): void {
        const socketId = this.connectedUsers.get(dto.receiverId);
        if (socketId) {
            this.server.to(socketId).emit(event, dto);
        }
    }
}
