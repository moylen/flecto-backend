import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ArticleService } from '../../domain/services/article/article.service';
import { SearchDto } from '../../../common/domain/dtos/search.dto';
import { ArticleSaveDto } from '../../domain/dtos/article/article-save.dto';
import { ContextDto } from '../../../common/domain/dtos/context.dto';
import { Context } from '../../../auth/infrastructure/decorators/context.decorator';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { MappingInterceptor } from '../../../common/domain/interceptors/mapping.interceptor';
import { ArticleSchema } from '../../domain/dtos/article/article.schema';
import { ArticleDetailSchema } from '../../domain/dtos/article/article-detail.schema';
import { ArticleLikeService } from '../../domain/services/article/article-like.service';

@ApiTags('Article')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/article')
export class ArticleController {
    constructor(
        private readonly articleService: ArticleService,
        private readonly articleLikeService: ArticleLikeService,
    ) {}

    @ApiOkResponse({ type: ArticleDetailSchema })
    @UseInterceptors(new MappingInterceptor(ArticleDetailSchema))
    @Get('/:slug')
    async findBySlug(@Param('slug') slug: string, @Context() context: ContextDto) {
        return this.articleService.findBySlugOrPanic(slug, context);
    }

    @ApiOkResponse({ type: ArticleSchema })
    @UseInterceptors(new MappingInterceptor(ArticleSchema))
    @Get('/')
    async findAll(@Body() dto: SearchDto) {
        return this.articleService.findAll(dto);
    }

    @ApiOkResponse({ type: ArticleSchema })
    @UseInterceptors(new MappingInterceptor(ArticleSchema))
    @Post('/')
    async create(@Body() dto: ArticleSaveDto, @Context() context: ContextDto) {
        return this.articleService.create(dto, context);
    }

    @ApiOkResponse({ type: ArticleSchema })
    @UseInterceptors(new MappingInterceptor(ArticleSchema))
    @Put('/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: ArticleSaveDto, @Context() context: ContextDto) {
        return this.articleService.update(id, dto, context);
    }

    @Put('/:id/like')
    async toggleLike(@Param('id', ParseIntPipe) id: number, @Context() context: ContextDto) {
        return this.articleLikeService.toggleLike(id, context);
    }

    @ApiOkResponse({ type: ArticleSchema })
    @UseInterceptors(new MappingInterceptor(ArticleSchema))
    @Patch('/:id')
    async softDelete(@Param('id', ParseIntPipe) id: number, @Context() context: ContextDto) {
        return this.articleService.softDelete(id, context);
    }
}
