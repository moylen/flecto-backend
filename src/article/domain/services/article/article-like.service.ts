import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/infrastructure/service/prisma.service';
import { ContextDto } from '../../../../common/domain/dtos/context.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArticleLikeService {
    constructor(private readonly prismaService: PrismaService) {}

    async findByArticleIdAndUserId(articleId: number, userId: number, tx?: Prisma.TransactionClient) {
        const client = tx ?? this.prismaService;
        return client.articleLike.findFirst({
            where: {
                articleId,
                userId,
            },
        });
    }

    async toggleLike(articleId: number, context: ContextDto): Promise<void> {
        await this.prismaService.$transaction(async (tx) => {
            const like = await this.findByArticleIdAndUserId(articleId, context.user.id, tx);

            if (like) {
                await tx.articleLike.deleteMany({
                    where: {
                        articleId,
                        userId: context.user.id,
                    },
                });
                return;
            }

            await tx.articleLike.create({
                data: {
                    articleId,
                    userId: context.user.id,
                    createTime: new Date(),
                },
            });
        });
    }
}
