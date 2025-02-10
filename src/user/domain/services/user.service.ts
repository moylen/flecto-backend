import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../database/infrastructure/service/prisma.service';
import { UserPasswordUpdateDto } from '../dtos/user/user-password-update.dto';
import { HashService } from '../../../common/domain/services/hash.service';
import { ContextDto } from '../../../common/domain/dtos/context.dto';
import { UserSaveDto } from '../dtos/user/user-save.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly hashService: HashService,
    ) {}

    async findByUsername(username: string) {
        return this.prisma.user.findUnique({
            where: {
                username,
            },
        });
    }

    async findByIdOrPanic(id: number) {
        const user = await this.prisma.user.findUnique({
            include: {
                userContacts: true,
            },
            where: {
                id,
                deleteTime: null,
            },
        });

        if (!user) {
            throw new NotFoundException(`Not found user by id: ${id}`);
        }

        return user;
    }

    async updatePassword(dto: UserPasswordUpdateDto, context: ContextDto) {
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

    async update(dto: UserSaveDto, context: ContextDto) {
        return this.prisma.user.update({
            include: {
                userContacts: true,
            },
            where: {
                id: context.user.id,
            },
            data: {
                ...dto,
                userContacts: {
                    upsert: dto.userContacts?.map((contact) => ({
                        where: {
                            id: contact.id || 0,
                        },
                        create: contact,
                        update: contact,
                    })),
                },
            },
        });
    }

    async create(username: string, passwordHash: string) {
        return this.prisma.user.create({ data: { username, passwordHash } });
    }
}
