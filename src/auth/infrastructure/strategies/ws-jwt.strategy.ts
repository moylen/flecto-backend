import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'ws-jwt') {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req) => {
                    const socket: Socket = req;
                    const authHeader = socket.handshake?.headers?.authorization;
                    if (!authHeader) {
                        return null;
                    }
                    const token = authHeader.split(' ')[1];
                    return token || null;
                },
            ]),
            ignoreExpiration: true,
            secretOrKey: configService.get<string>('ACCESS_SECRET'),
        });
    }

    async validate(payload: any) {
        return { id: payload.sub, role: payload.role };
    }
}
