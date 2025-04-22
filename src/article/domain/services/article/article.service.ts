import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ArticleSaveDto } from '../../dtos/article/article-save.dto';
import { ContextDto } from '../../../../common/domain/dtos/context.dto';
import { PrismaService } from '../../../../database/infrastructure/service/prisma.service';
import { SlugHelper } from '../../../../common/domain/helpers/slug.helper';
import { RepositoryHelper } from '../../../../common/domain/helpers/repository.helper';
import { ArticleViewService } from './article-view.service';
import { SortedSearchDto } from '../../../../common/domain/dtos/sorted-search.dto';

@Injectable()
export class ArticleService {
    constructor(
        private readonly prismaService: PrismaService,
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
                auction: true,
                files: {
                    select: {
                        file: true,
                    },
                },
                tags: {
                    select: {
                        tag: true,
                    },
                },
                likes: {
                    where: {
                        userId: context.user.id,
                    },
                },
                _count: {
                    select: {
                        likes: true,
                        views: true,
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

        await this.articleViewService.create(article.id, context.user.id);

        return {
            ...article,
            isLiked: article.likes.length > 0,
            likesCount: article._count.likes,
            viewsCount: article._count.views,
        };
    }

    async findAll(dto: SortedSearchDto, context: ContextDto) {
        const sortFields = RepositoryHelper.extractSortFields(dto);

        const articles = await this.prismaService.article.findMany({
            include: {
                files: {
                    select: {
                        file: true,
                    },
                },
                tags: {
                    select: {
                        tag: true,
                    },
                },
                likes: {
                    where: {
                        userId: context.user.id,
                    },
                },
                _count: {
                    select: {
                        likes: true,
                        views: true,
                    },
                },
            },
            where: {
                title: {
                    contains: dto.query,
                    mode: 'insensitive',
                },
                deleteTime: null,
            },
            orderBy: [
                sortFields['likes'] && {
                    likes: {
                        _count: sortFields['likes'],
                    },
                },
                sortFields['views'] && {
                    views: {
                        _count: sortFields['views'],
                    },
                },
                sortFields['createTime'] && { createTime: sortFields['createTime'] },
            ],
            ...RepositoryHelper.applyPagination(dto),
        });

        return articles.map((article) => ({
            ...article,
            isLiked: article.likes.length > 0,
            likesCount: article._count.likes,
            viewsCount: article._count.views,
        }));
    }

    async create(dto: ArticleSaveDto, context: ContextDto) {
        return this.prismaService.article.create({
            data: {
                title: dto.title,
                description: dto.description,
                slug: SlugHelper.getSlug(dto.title),
                creatorId: context.user.id,
                tags: {
                    create: dto.tags?.map((tag) => ({
                        tag: {
                            connectOrCreate: {
                                where: {
                                    title: tag.title,
                                },
                                create: tag,
                            },
                        },
                    })),
                },
                files: {
                    create: dto.fileIds?.map((id) => ({
                        file: {
                            connect: {
                                id,
                            },
                        },
                    })),
                },
            },
        });
    }

    async update(id: number, dto: ArticleSaveDto, context: ContextDto) {
        const article = await this.findByIdOrPanic(id);

        if (article.creatorId !== context.user.id) {
            throw new ForbiddenException('Access denied');
        }

        return this.prismaService.article.update({
            include: {
                tags: {
                    select: {
                        tag: true,
                    },
                },
                files: {
                    select: {
                        file: true,
                    },
                },
            },
            where: {
                id,
            },
            data: {
                title: dto.title,
                description: dto.description,
                tags: {
                    deleteMany: {},
                    create: dto.tags?.map((tag) => ({
                        tag: {
                            connectOrCreate: {
                                where: {
                                    title: tag.title,
                                },
                                create: tag,
                            },
                        },
                    })),
                },
                files: {
                    deleteMany: {},
                    create: dto.fileIds?.map((id) => ({
                        file: {
                            connect: {
                                id,
                            },
                        },
                    })),
                },
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
