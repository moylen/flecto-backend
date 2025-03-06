import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../database/infrastructure/service/prisma.service';
import { UserPasswordUpdateDto } from '../dtos/user/user-password-update.dto';
import { HashService } from '../../../common/domain/services/hash.service';
import { ContextDto } from '../../../common/domain/dtos/context.dto';
import { UserSaveDto } from '../dtos/user/user-save.dto';
import { UserUsernameUpdateDto } from '../dtos/user/user-username-update.dto';
import { UserSearchDto } from '../dtos/user/user-search.dto';
import { RepositoryHelper } from '../../../common/domain/helpers/repository.helper';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly hashService: HashService,
    ) {}

    async findAll(dto: UserSearchDto) {
        return this.prismaService.user.findMany({
            where: {
                username: {
                    contains: dto.username,
                    mode: 'insensitive',
                },
            },
            ...RepositoryHelper.applyPagination(dto),
        });
    }

    async findByUsername(username: string) {
        return this.prismaService.user.findUnique({
            where: {
                username,
            },
        });
    }

    async findByIdOrPanic(id: number) {
        const user = await this.prismaService.user.findUnique({
            include: {
                contacts: true,
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

    async create(username: string, passwordHash: string) {
        return this.prismaService.user.create({ data: { username, passwordHash } });
    }

    async update(dto: UserSaveDto, context: ContextDto) {
        return this.prismaService.user.update({
            where: {
                id: context.user.id,
            },
            data: {
                ...dto,
                contacts: {
                    deleteMany: {
                        id: {
                            notIn: dto.contacts?.map((contact) => contact.id).filter(Boolean),
                        },
                    },
                    upsert: dto.contacts?.map((contact) => ({
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

    async updatePassword(dto: UserPasswordUpdateDto, context: ContextDto) {
        const user = await this.findByIdOrPanic(context.user.id);

        const isVerified = await this.hashService.verify(user.passwordHash, dto.oldPassword);

        if (!isVerified) {
            throw new BadRequestException('Old password is wrong');
        }

        return this.prismaService.user.update({
            where: {
                id: context.user.id,
            },
            data: {
                passwordHash: await this.hashService.hashPassword(dto.newPassword),
            },
        });
    }

    async updateUsername(dto: UserUsernameUpdateDto, context: ContextDto) {
        return this.prismaService.user.update({
            where: {
                id: context.user.id,
            },
            data: {
                username: dto.username,
            },
        });
    }

    async updateAvatar(avatarId: number, context: ContextDto) {
        return this.prismaService.user.update({
            where: {
                id: context.user.id,
            },
            data: {
                avatarId,
            },
        });
    }
}
