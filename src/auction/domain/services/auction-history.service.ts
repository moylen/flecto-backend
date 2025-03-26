import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/infrastructure/service/prisma.service';
import { AuctionHistoryCreateDto } from '../dtos/auction-history/auction-history-create.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuctionHistoryService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(dto: AuctionHistoryCreateDto, tx?: Prisma.TransactionClient) {
        const client = tx ?? this.prismaService;
        return client.auctionHistory.create({ data: dto });
    }
}
