import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/infrastructure/service/prisma.service';

@Injectable()
export class ArticleViewService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(articleId: number, userId: number): Promise<void> {
        await this.prismaService.articleView.upsert({
            where: {
                userId_articleId: {
                    articleId,
                    userId,
                },
            },
            update: {},
            create: {
                articleId,
                userId,
                createTime: new Date(),
            },
        });
    }
}
