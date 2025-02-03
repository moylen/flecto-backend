import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../database/infrastructure/service/prisma.service';
import { User } from '@prisma/client';
import { UserPasswordUpdateDto } from '../dtos/user-password-update.dto';
import { HashService } from '../../../common/domain/services/hash.service';
import { ContextDto } from '../../../common/domain/dtos/context.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly hashService: HashService,
    ) {}

    async findByUsername(username: string): Promise<User> {
        return this.prisma.user.findUnique({
            where: {
                username,
            },
        });
    }

    async findByIdOrPanic(id: number): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });

        if (!user) {
            throw new NotFoundException(`Not found user by id: ${id}`);
        }

        return user;
    }

    async updatePassword(dto: UserPasswordUpdateDto, context: ContextDto): Promise<User> {
        const user = await this.findByIdOrPanic(context.user.id);

        const isVerified = await this.hashService.verify(user.passwordHash, dto.oldPassword);

        if (!isVerified) {
            throw new BadRequestException('Old password is wrong');
        }

        return this.prisma.user.update({
            where: {
                id: context.user.id,
            },
            data: {
                passwordHash: await this.hashService.hashPassword(dto.newPassword),
            },
        });
    }

    async create(username: string, passwordHash: string): Promise<User> {
        return this.prisma.user.create({ data: { username, passwordHash } });
    }
}
