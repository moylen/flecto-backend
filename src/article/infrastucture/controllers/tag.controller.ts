import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { TagService } from 'src/article/domain/services/tag/tag.service';
import { SearchDto } from '../../../common/domain/dtos/search.dto';
import { TagSchema } from '../schemas/tag/tag.schema';
import { MappingInterceptor } from '../../../common/domain/interceptors/mapping.interceptor';

@ApiTags('Tag')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @ApiOkResponse({ type: [TagSchema] })
    @UseInterceptors(new MappingInterceptor(TagSchema))
    @Get('/autocomplete')
    async autocomplete(@Query() dto: SearchDto) {
        return this.tagService.autocomplete(dto);
    }
}
