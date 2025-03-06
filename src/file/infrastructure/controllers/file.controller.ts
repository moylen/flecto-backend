import { Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileService } from '../../domain/services/file.service';
import { FastifyRequest } from 'fastify';
import { MappingInterceptor } from '../../../common/domain/interceptors/mapping.interceptor';
import { FileSchema } from '../schemas/file.schema';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { FileSaveDto } from '../../domain/dto/file.save.dto';
import { FilesSaveDto } from '../../domain/dto/files.save.dto';

@ApiTags('File')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/file')
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @ApiOkResponse({
        content: {
            'application/octet-stream': {
                schema: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @Get('/:id')
    async getStreamById(@Param('id', ParseIntPipe) id: number) {
        return this.fileService.getStreamByFileIdOrPanic(id);
    }

    @ApiOkResponse({ type: FileSchema })
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: FileSaveDto })
    @UseInterceptors(new MappingInterceptor(FileSchema))
    @Post('/one')
    async uploadOne(@Req() req: FastifyRequest) {
        return this.fileService.uploadOne(await req.file());
    }

    @ApiOkResponse({ type: [FileSchema] })
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: FilesSaveDto })
    @UseInterceptors(new MappingInterceptor(FileSchema))
    @Post('/many')
    async uploadMany(@Req() req: FastifyRequest) {
        return this.fileService.uploadMany(req.files());
    }
}
