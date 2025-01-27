import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/infrastructure/prisma.service';
import { UserSaveDto } from '../dtos/user-save.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async findByUsername(username: string): Promise<User> {
        return this.prisma.user.findUnique({
            where: {
                username,
            },
        });
    }

    async findByIdOrPanic(id: number): Promise<User> {
        return this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    async create(dto: UserSaveDto): Promise<User> {
        return this.prisma.user.create({ data: dto });
    }
}
