import { Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ChatMessageService } from '../../domain/services/chat-message.service';
import { ChatMessageSearchDto } from '../../domain/dtos/chat-message-search.dto';
import { Context } from '../../../auth/infrastructure/decorators/context.decorator';
import { ContextDto } from '../../../common/domain/dtos/context.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { ChatMessageSchema } from '../schemas/chat-message.schema';
import { MappingInterceptor } from '../../../common/domain/interceptors/mapping.interceptor';

@ApiTags('Chat message')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/chat-message')
export class ChatMessageController {
    constructor(private readonly chatMessageService: ChatMessageService) {}

    @ApiOkResponse({ type: [ChatMessageSchema] })
    @UseInterceptors(new MappingInterceptor(ChatMessageSchema))
    @Get('/')
    async findAll(@Query() dto: ChatMessageSearchDto, @Context() context: ContextDto) {
        return this.chatMessageService.findAll(dto, context);
    }
}
