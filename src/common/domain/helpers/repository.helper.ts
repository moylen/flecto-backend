import { SearchDto } from '../dtos/search.dto';

export class RepositoryHelper {
    static applyPagination<T extends SearchDto>(dto: T) {
        const { page = 0, pageSize = 25 } = dto;
        return {
            take: pageSize,
            skip: pageSize * page,
        };
    }
}
