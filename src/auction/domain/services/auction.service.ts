import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/infrastructure/service/prisma.service';
import { AuctionCreateDto } from '../dtos/auction/auction-create.dto';
import { ContextDto } from '../../../common/domain/dtos/context.dto';
import { AuctionHistoryService } from './auction-history.service';
import { Auction, AuctionAction } from '@prisma/client';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ArticleService } from 'src/article/domain/services/article/article.service';

@Injectable()
export class AuctionService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly auctionHistoryService: AuctionHistoryService,
        private readonly articleService: ArticleService,
    ) {}

    async findByIdOrPanic(id: number) {
        const auction = await this.prismaService.auction.findUnique({
            where: {
                id,
                deleteTime: null,
            },
            include: {
                history: {
                    orderBy: {
                        id: 'desc',
                    },
                },
            },
        });

        if (!auction) {
            throw new NotFoundException(`Not found auction by id: ${id}`);
        }

        return auction;
    }

    async createOrPanic(dto: AuctionCreateDto, context: ContextDto) {
        const article = await this.articleService.findByIdOrPanic(dto.articleId);

        if (article.creatorId !== context.user.id) {
            throw new ForbiddenException('Access denied');
        }

        return this.prismaService.$transaction(async (tx) => {
            const auction = await tx.auction.create({
                data: {
                    creatorId: context.user.id,
                    currentPrice: dto.startPrice,
                    ...dto,
                },
            });

            await this.auctionHistoryService.create(
                {
                    auctionId: auction.id,
                    action: AuctionAction.BEGIN,
                    isSystem: true,
                },
                tx,
            );

            return auction;
        });
    }

    async bid(auctionId: number, context: ContextDto) {
        return this.prismaService.$transaction(async (tx) => {
            const auction = await tx.auction.findUnique({
                where: {
                    id: auctionId,
                },
            });

            if (auction.isOver) {
                throw new BadRequestException('Auction already over');
            }

            const updatedAuction = await tx.auction.update({
                where: { id: auction.id },
                data: {
                    currentPrice: auction.currentPrice + auction.stepPrice,
                },
            });

            await this.auctionHistoryService.create(
                {
                    auctionId: updatedAuction.id,
                    userId: context.user.id,
                    action: AuctionAction.BID,
                    isSystem: false,
                },
                tx,
            );

            return updatedAuction;
        });
    }

    @Cron(CronExpression.EVERY_MINUTE)
    async end() {
        const pretends = await this.prismaService.auction.findMany({
            where: {
                untilTime: {
                    lt: new Date(),
                },
                isOver: false,
            },
        });

        await Promise.all(pretends.map(async (auction) => this.over(auction)));
    }

    private async over(auction: Auction): Promise<void> {
        return this.prismaService.$transaction(async (tx) => {
            await tx.auction.update({
                where: {
                    id: auction.id,
                },
                data: {
                    isOver: true,
                },
            });

            await this.auctionHistoryService.create(
                {
                    auctionId: auction.id,
                    action: AuctionAction.END,
                    isSystem: true,
                },
                tx,
            );
        });
    }
}
