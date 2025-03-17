import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/infrastructure/service/prisma.service';
import { UserTokenSaveDto } from '../dtos/user-token/user-token-save.dto';

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
                    isRevoked: false,
                    expireTime: {
                        gte: new Date(),
                    },
                },
            },
        });
    }

    async create(dto: UserTokenSaveDto) {
        return this.prismaService.userToken.create({ data: dto });
    }

    async revoke(refreshToken: string) {
        return this.prismaService.userToken.update({
            where: {
                refreshToken,
            },
            data: {
                isRevoked: true,
            },
        });
    }
}
