import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../database/infrastructure/service/prisma.service';
import { ArticleCommentCreateDto } from '../../dtos/article-comment/article-comment-create.dto';
import { ContextDto } from '../../../../common/domain/dtos/context.dto';
import { ArticleCommentSearchDto } from '../../dtos/article-comment/article-comment-search.dto';
import { RepositoryHelper } from '../../../../common/domain/helpers/repository.helper';
import { ArticleCommentUpdateDto } from '../../dtos/article-comment/article-comment-update.dto';

@Injectable()
export class ArticleCommentService {
    constructor(private readonly prismaService: PrismaService) {}

    async findByIdOrPanic(id: number) {
        const comment = await this.prismaService.articleComment.findUnique({
            where: {
                id,
                deleteTime: null,
            },
        });

        if (!comment) {
            throw new NotFoundException(`Not found article comment by id: ${id}`);
        }

        return comment;
    }

    async findAll(dto: ArticleCommentSearchDto) {
        return this.prismaService.articleComment.findMany({
            include: {
                creator: true,
            },
            where: {
                articleId: dto.articleId,
                deleteTime: null,
            },
            ...RepositoryHelper.applyPagination(dto),
        });
    }

    async create(dto: ArticleCommentCreateDto, context: ContextDto) {
        return this.prismaService.articleComment.create({
            include: {
                creator: true,
            },
            data: {
                article: {
                    connect: {
                        id: dto.articleId,
                    },
                },
                creator: {
                    connect: {
                        id: context.user.id,
                    },
                },
                content: dto.content,
            },
        });
    }

    async update(id: number, dto: ArticleCommentUpdateDto, context: ContextDto) {
        const comment = await this.findByIdOrPanic(id);

        if (comment.creatorId !== context.user.id) {
            throw new ForbiddenException('Access denied');
        }

        return this.prismaService.articleComment.update({
            include: {
                creator: true,
            },
            where: {
                id,
            },
            data: dto,
        });
    }

    async softDelete(id: number, context: ContextDto) {
        const comment = await this.findByIdOrPanic(id);

        if (comment.creatorId !== context.user.id) {
            throw new ForbiddenException('Access denied');
        }

        return this.prismaService.articleComment.update({
            where: {
                id,
            },
            data: {
                deleteTime: new Date(),
            },
        });
    }
}
