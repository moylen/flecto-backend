import { Socket } from 'socket.io';
import { ContextDto } from '../../../common/domain/dtos/context.dto';

export interface AuthSocket extends Socket {
    context: ContextDto;
}
