import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/infrastructure/database.module';
import { AuctionController } from './controllers/auction.controller';
import { AuctionService } from '../domain/services/auction.service';
import { AuctionHistoryService } from '../domain/services/auction-history.service';
import { FutureDateTimeValidator } from 'src/common/domain/validators/future-date-time.validator';
import { ArticleModule } from '../../article/infrastucture/article.module';

@Module({
    imports: [DatabaseModule, ArticleModule],
    controllers: [AuctionController],
    providers: [AuctionService, AuctionHistoryService, FutureDateTimeValidator],
})
export class AuctionModule {}
