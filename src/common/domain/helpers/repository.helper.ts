import { PaginationDto } from '../dtos/pagination.dto';

export class RepositoryHelper {
    static applyPagination<T extends PaginationDto>(dto: T) {
        const { page = 0, pageSize = 25 } = dto;
        return {
            take: pageSize,
            skip: pageSize * page,
        };
    }
}
