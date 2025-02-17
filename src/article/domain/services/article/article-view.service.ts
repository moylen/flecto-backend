import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/infrastructure/service/prisma.service';
import { ContextDto } from '../../../../common/domain/dtos/context.dto';

@Injectable()
export class ArticleViewService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(articleId: number, context: ContextDto): Promise<void> {
        await this.prismaService.articleView.upsert({
            where: {
                userId_articleId: {
                    articleId,
                    userId: context.user.id,
                },
            },
            update: {},
            create: {
                articleId,
                userId: context.user.id,
                createTime: new Date(),
            },
        });
    }
}
