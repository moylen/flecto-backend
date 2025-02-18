import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthSocket } from '../../../chat/infrastructure/interface/auth-socket';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsJwtAuthGuard extends AuthGuard('ws-jwt') {
    handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
        const socket = context.switchToWs().getClient<AuthSocket>();
        if (err || !user) {
            socket.disconnect();
            throw err || new WsException('invalid token');
        }
        socket.context = { user };
        return user;
    }
}
