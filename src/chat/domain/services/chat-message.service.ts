import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../database/infrastructure/service/prisma.service';
import { ChatMessageSearchDto } from '../dtos/chat-message-search.dto';
import { RepositoryHelper } from '../../../common/domain/helpers/repository.helper';
import { ContextDto } from '../../../common/domain/dtos/context.dto';
import { ChatMessageCreateDto } from '../dtos/chat-message-create.dto';
import { ChatMessageUpdateDto } from '../dtos/chat-message-update.dto';
import { ChatMessageDeleteDto } from '../dtos/chat-message-delete.dto';
import { PaginationDto } from '../../../common/domain/dtos/pagination.dto';
import { Prisma } from '@prisma/client';
import { ChatMessageSchema } from '../../infrastructure/schemas/chat-message.schema';

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
        const where: Prisma.ChatMessageWhereInput = {
            OR: [
                { senderId: context.user.id, receiverId: dto.receiverId },
                { senderId: dto.receiverId, receiverId: context.user.id },
            ],
            deleteTime: null,
        };

        const [total, items] = await this.prismaService.$transaction([
            this.prismaService.chatMessage.count({ where }),
            this.prismaService.chatMessage.findMany({
                where,
                include: {
                    sender: true,
                    receiver: true,
                },
                ...RepositoryHelper.applyPagination(dto),
            }),
        ]);

        return { total, items };
    }

    async findRooms(dto: PaginationDto, context: ContextDto) {
        const { take, skip } = RepositoryHelper.applyPagination(dto);

        return this.prismaService.$queryRaw`
            SELECT DISTINCT ON (
                LEAST("senderId", "receiverId"),
                GREATEST("senderId", "receiverId")
                ) chat_message."id",
                  chat_message."senderId",
                  chat_message."receiverId",
                  chat_message."content",
                  chat_message."createTime",
                  chat_message."updateTime",
                  chat_message."deleteTime",
                  json_build_object(
                          'id', sender."id",
                          'username', sender."username",
                          'avatarId', sender."avatarId"
                  ) AS sender,
                  json_build_object(
                          'id', receiver."id",
                          'username', receiver."username",
                          'avatarId', receiver."avatarId"
                  ) AS receiver
            FROM "chat_message"
                     LEFT JOIN "user" sender ON sender.id = "senderId"
                     LEFT JOIN "user" receiver ON receiver.id = "receiverId"
            WHERE "senderId" = ${context.user.id} OR "receiverId" = ${context.user.id}
            ORDER BY LEAST("senderId", "receiverId"),
                     GREATEST("senderId", "receiverId"),
                     chat_message."createTime" DESC
            LIMIT ${take} OFFSET ${skip}
        `;
    }

    async create(senderId: number, dto: ChatMessageCreateDto): Promise<ChatMessageSchema> {
        const chatMessage = await this.prismaService.chatMessage.create({
            include: {
                sender: true,
                receiver: true,
            },
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

        return {
            ...chatMessage,
            sender: {
                id: chatMessage.sender.id,
                username: chatMessage.sender.username,
                avatarId: chatMessage.sender.avatarId,
            },
            receiver: {
                id: chatMessage.receiver.id,
                username: chatMessage.receiver.username,
                avatarId: chatMessage.receiver.avatarId,
            },
        };
    }

    async update(senderId: number, dto: ChatMessageUpdateDto): Promise<ChatMessageSchema> {
        const message = await this.findByIdOrPanic(dto.id);

        if (message.senderId !== senderId) {
            throw new ForbiddenException('Access denied');
        }

        const chatMessage = await this.prismaService.chatMessage.update({
            include: {
                sender: true,
                receiver: true,
            },
            where: {
                id: dto.id,
            },
            data: dto,
        });

        return {
            ...chatMessage,
            sender: {
                id: chatMessage.sender.id,
                username: chatMessage.sender.username,
                avatarId: chatMessage.sender.avatarId,
            },
            receiver: {
                id: chatMessage.receiver.id,
                username: chatMessage.receiver.username,
                avatarId: chatMessage.receiver.avatarId,
            },
        };
    }

    async softDelete(senderId: number, dto: ChatMessageDeleteDto): Promise<ChatMessageSchema> {
        const message = await this.findByIdOrPanic(dto.id);

        if (message.senderId !== senderId) {
            throw new ForbiddenException('Access denied');
        }

        const chatMessage = await this.prismaService.chatMessage.update({
            include: {
                sender: true,
                receiver: true,
            },
            where: {
                id: dto.id,
            },
            data: {
                deleteTime: new Date(),
            },
        });

        return {
            ...chatMessage,
            sender: {
                id: chatMessage.sender.id,
                username: chatMessage.sender.username,
                avatarId: chatMessage.sender.avatarId,
            },
            receiver: {
                id: chatMessage.receiver.id,
                username: chatMessage.receiver.username,
                avatarId: chatMessage.receiver.avatarId,
            },
        };
    }
}
