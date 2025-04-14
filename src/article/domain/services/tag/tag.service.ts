import { PrismaService } from '../../../../database/infrastructure/service/prisma.service';
import { Injectable } from '@nestjs/common';
import { SearchDto } from '../../../../common/domain/dtos/search.dto';
import { RepositoryHelper } from '../../../../common/domain/helpers/repository.helper';

@Injectable()
export class TagService {
    constructor(private readonly prismaService: PrismaService) {}

    async autocomplete(dto: SearchDto) {
        return this.prismaService.tag.findMany({
            where: {
                title: {
                    contains: dto.query,
                    mode: 'insensitive',
                },
            },
            ...RepositoryHelper.applyPagination(dto),
        });
    }
}
