import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/infrastructure/service/prisma.service';
import { UserEmailUpdateDto } from '../dtos/user/user-email-update.dto';
import { ContextDto } from 'src/common/domain/dtos/context.dto';
import { addMinutes } from 'date-fns';
import { Prisma } from '@prisma/client';
import { UserConfirmEmailDto } from '../dtos/user/user-confirm-email.dto';

@Injectable()
export class UserEmailConfirmService {
    constructor(private readonly prismaService: PrismaService) {}

    async confirmOrPanic(dto: UserConfirmEmailDto, context: ContextDto) {
        const emailConfirm = await this.prismaService.userEmailConfirm.findFirst({
            where: {
                code: dto.code,
                userId: context.user.id,
                isActive: true,
                expireTime: {
                    gt: new Date(),
                },
            },
        });

        if (!emailConfirm) {
            throw new BadRequestException('Wrong or expired code');
        }

        return this.prismaService.userEmailConfirm.update({
            where: {
                id: emailConfirm.id,
            },
            data: {
                isActive: false,
            },
        });
    }

    async create(dto: UserEmailUpdateDto, context: ContextDto) {
        return this.prismaService.$transaction(async (tx) => {
            await this.deactivateAllByUserId(context.user.id, tx);

            return tx.userEmailConfirm.create({
                data: {
                    userId: context.user.id,
                    newEmail: dto.newEmail,
                    code: `${Math.floor(100_000 + Math.random() * 900_000)}`,
                    expireTime: addMinutes(new Date(), 15),
                },
            });
        });
    }

    private async deactivateAllByUserId(userId: number, tx: Prisma.TransactionClient) {
        return tx.userEmailConfirm.updateMany({
            where: {
                userId,
            },
            data: {
                isActive: false,
            },
        });
    }
}
