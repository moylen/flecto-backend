import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/infrastructure/service/prisma.service';
import { ContextDto } from '../../../common/domain/dtos/context.dto';

@Injectable()
export class ArticleViewService {
    constructor(private readonly prismaService: PrismaService) {}

    async count(articleId: number, context: ContextDto): Promise<number> {
        return this.prismaService.articleView.count({
            where: {
                articleId,
                userId: context.user.id,
            },
        });
    }

    async create(articleId: number, context: ContextDto): Promise<void> {
        const view = await this.prismaService.articleView.findFirst({
            where: {
                articleId,
                userId: context.user.id,
            },
        });

        if (view) {
            return;
        }

        await this.prismaService.articleView.create({
            data: {
                articleId,
                userId: context.user.id,
                createTime: new Date(),
            },
        });
    }
}
