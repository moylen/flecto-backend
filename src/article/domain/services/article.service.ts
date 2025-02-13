import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ArticleSaveDto } from '../dtos/article-save.dto';
import { ContextDto } from '../../../common/domain/dtos/context.dto';
import { SearchDto } from '../../../common/domain/dtos/search.dto';
import { PrismaService } from '../../../database/infrastructure/service/prisma.service';
import { SlugHelper } from '../../../common/domain/helpers/slug.helper';
import { RepositoryHelper } from '../../../common/domain/helpers/repository.helper';
import { ArticleLikeService } from './article-like.service';
import { ArticleViewService } from './article-view.service';

@Injectable()
export class ArticleService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly articleLikeService: ArticleLikeService,
        private readonly articleViewService: ArticleViewService,
    ) {}

    async findByIdOrPanic(id: number) {
        const article = await this.prismaService.article.findUnique({
            where: {
                id,
                deleteTime: null,
            },
        });

        if (!article) {
            throw new NotFoundException('Article not found');
        }

        return article;
    }

    async findBySlugOrPanic(slug: string, context: ContextDto) {
        const article = await this.prismaService.article.findUnique({
            include: {
                creator: true,
                _count: {
                    select: {
                        articleLikes: true,
                        articleViews: true,
                    },
                },
            },
            where: {
                slug,
                deleteTime: null,
            },
        });

        if (!article) {
            throw new NotFoundException('Article not found');
        }

        const [like] = await Promise.all([
            this.articleLikeService.findByArticleIdAndUserId(article.id, context.user.id),
            this.articleViewService.create(article.id, context),
        ]);

        return {
            ...article,
            isLiked: !!like,
            likesCount: article._count.articleLikes,
            viewsCount: article._count.articleViews,
        };
    }

    async findAll(dto: SearchDto) {
        return this.prismaService.article.findMany({
            where: {
                title: {
                    contains: dto.query,
                    mode: 'insensitive',
                },
                deleteTime: null,
            },
            ...RepositoryHelper.applyPagination(dto),
        });
    }

    async create(dto: ArticleSaveDto, context: ContextDto) {
        return this.prismaService.article.create({
            data: {
                ...dto,
                slug: SlugHelper.getSlug(dto.title),
                creatorId: context.user.id,
            },
        });
    }

    async update(id: number, dto: ArticleSaveDto, context: ContextDto) {
        const article = await this.findByIdOrPanic(id);

        if (article.creatorId !== context.user.id) {
            throw new ForbiddenException('Access denied');
        }

        return this.prismaService.article.update({
            where: {
                id,
            },
            data: {
                ...dto,
            },
        });
    }

    async softDelete(id: number, context: ContextDto) {
        const article = await this.findByIdOrPanic(id);

        if (article.creatorId !== context.user.id) {
            throw new ForbiddenException('Access denied');
        }

        return this.prismaService.article.update({
            where: {
                id,
            },
            data: {
                deleteTime: new Date(),
            },
        });
    }
}
