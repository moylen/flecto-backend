import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/infrastructure/service/prisma.service';

@Injectable()
export class UserTokenService {
    constructor(private readonly prismaService: PrismaService) {}

    async findByRefreshToken(refreshToken: string) {
        return this.prismaService.userToken.findFirst({
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
        return this.prismaService.userToken.create({
            data: {
                userId,
                refreshToken,
                expireTime,
            },
        });
    }
}
