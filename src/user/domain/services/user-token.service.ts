import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/infrastructure/prisma.service';

@Injectable()
export class UserTokenService {
    constructor(private readonly prisma: PrismaService) {}

    async findByRefreshToken(refreshToken: string) {
        return this.prisma.userToken.findFirst({
            include: {
                user: true,
            },
            where: {
                AND: {
                    refreshToken,
                    expireTime: {
                        gte: new Date(),
                    },
                },
            },
        });
    }

    async create(userId: number, refreshToken: string, expireTime: Date) {
        return this.prisma.userToken.create({
            data: {
                userId,
                refreshToken,
                expireTime,
            },
        });
    }
}
