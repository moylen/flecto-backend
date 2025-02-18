import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../database/infrastructure/service/prisma.service';
import { ChatMessageSaveDto } from '../dtos/chat-message-save.dto';
import { ChatMessageSearchDto } from '../dtos/chat-message-search.dto';
import { RepositoryHelper } from '../../../common/domain/helpers/repository.helper';
import { ContextDto } from '../../../common/domain/dtos/context.dto';

@Injectable()
export class ChatMessageService {
    constructor(private readonly prismaService: PrismaService) {}

    async findByIdOrPanic(id: number) {
        const message = await this.prismaService.chatMessage.findUnique({
            where: {
                id,
                deleteTime: null,
            },
        });

        if (!message) {
            throw new NotFoundException(`Not found chat message by id: ${id}`);
        }

        return message;
    }

    async findAll(dto: ChatMessageSearchDto, context: ContextDto) {
        return this.prismaService.chatMessage.findMany({
            where: {
                senderId: context.user.id,
                receiverId: dto.receiverId,
                deleteTime: null,
            },
            ...RepositoryHelper.applyPagination(dto),
        });
    }

    async create(senderId: number, dto: ChatMessageSaveDto) {
        return this.prismaService.chatMessage.create({
            data: {
                sender: {
                    connect: {
                        id: senderId,
                    },
                },
                receiver: {
                    connect: {
                        id: dto.receiverId,
                    },
                },
                content: dto.content,
            },
        });
    }

    async update(senderId: number, dto: ChatMessageSaveDto) {
        const message = await this.findByIdOrPanic(dto.id);

        if (message.senderId !== senderId) {
            throw new ForbiddenException('Access denied');
        }

        return this.prismaService.chatMessage.update({
            where: {
                id: dto.id,
            },
            data: {
                content: dto.content,
            },
        });
    }

    async softDelete(senderId: number, dto: ChatMessageSaveDto) {
        const message = await this.findByIdOrPanic(dto.id);

        if (message.senderId !== senderId) {
            throw new ForbiddenException('Access denied');
        }

        return this.prismaService.chatMessage.update({
            where: {
                id: dto.id,
            },
            data: {
                deleteTime: new Date(),
            },
        });
    }
}
