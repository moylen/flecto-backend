import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    Query,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ArticleCommentService } from '../../domain/services/article/article-comment.service';
import { ArticleCommentSearchDto } from '../../domain/dtos/article-comment/article-comment-search.dto';
import { ArticleCommentCreateDto } from '../../domain/dtos/article-comment/article-comment-create.dto';
import { Context } from '../../../auth/infrastructure/decorators/context.decorator';
import { ContextDto } from '../../../common/domain/dtos/context.dto';
import { ArticleCommentUpdateDto } from '../../domain/dtos/article-comment/article-comment-update.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { MappingInterceptor } from '../../../common/domain/interceptors/mapping.interceptor';
import { ArticleCommentDetailSchema } from '../schemas/article-comment/article-comment-detail.schema';
import { ArticleCommentSchema } from '../schemas/article-comment/article-comment.schema';

@ApiTags('Article comment')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/article-comment')
export class ArticleCommentController {
    constructor(private readonly articleCommentService: ArticleCommentService) {}

    @ApiOkResponse({ type: ArticleCommentDetailSchema })
    @UseInterceptors(new MappingInterceptor(ArticleCommentDetailSchema))
    @Get('/')
    async findAll(@Query() dto: ArticleCommentSearchDto) {
        return this.articleCommentService.findAll(dto);
    }

    @ApiOkResponse({ type: ArticleCommentDetailSchema })
    @UseInterceptors(new MappingInterceptor(ArticleCommentDetailSchema))
    @Post('/')
    async create(@Body() dto: ArticleCommentCreateDto, @Context() context: ContextDto) {
        return this.articleCommentService.create(dto, context);
    }

    @ApiOkResponse({ type: ArticleCommentDetailSchema })
    @UseInterceptors(new MappingInterceptor(ArticleCommentDetailSchema))
    @Put('/:id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: ArticleCommentUpdateDto,
        @Context() context: ContextDto,
    ) {
        return this.articleCommentService.update(id, dto, context);
    }

    @ApiOkResponse({ type: ArticleCommentSchema })
    @UseInterceptors(new MappingInterceptor(ArticleCommentSchema))
    @Patch('/:id')
    async softDelete(@Param('id', ParseIntPipe) id: number, @Context() context: ContextDto) {
        return this.articleCommentService.softDelete(id, context);
    }
}
