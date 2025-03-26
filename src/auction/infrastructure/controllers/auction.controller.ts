import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuctionService } from 'src/auction/domain/services/auction.service';
import { AuctionCreateDto } from '../../domain/dtos/auction/auction-create.dto';
import { Context } from '../../../auth/infrastructure/decorators/context.decorator';
import { ContextDto } from '../../../common/domain/dtos/context.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { AuctionSchema } from '../schemas/auction/auction.schema';
import { MappingInterceptor } from '../../../common/domain/interceptors/mapping.interceptor';
import { AuctionDetailSchema } from '../schemas/auction/auction-detail.schema';

@ApiTags('Auction')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/auction')
export class AuctionController {
    constructor(private readonly auctionService: AuctionService) {}

    @ApiOkResponse({ type: AuctionDetailSchema })
    @UseInterceptors(new MappingInterceptor(AuctionDetailSchema))
    @Get('/:id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.auctionService.findByIdOrPanic(id);
    }

    @ApiOkResponse({ type: AuctionSchema })
    @UseInterceptors(new MappingInterceptor(AuctionSchema))
    @Post('/')
    async create(@Body() dto: AuctionCreateDto, @Context() context: ContextDto) {
        return this.auctionService.createOrPanic(dto, context);
    }

    @ApiOkResponse({ type: AuctionSchema })
    @UseInterceptors(new MappingInterceptor(AuctionSchema))
    @Patch('/:id/bid')
    async bid(@Param('id', ParseIntPipe) id: number, @Context() context: ContextDto) {
        return this.auctionService.bid(id, context);
    }
}
