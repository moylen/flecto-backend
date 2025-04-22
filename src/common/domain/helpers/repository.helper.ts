import { PaginationDto } from '../dtos/pagination.dto';
import { SortedSearchDto } from '../dtos/sorted-search.dto';

export class RepositoryHelper {
    static applyPagination<T extends PaginationDto>(dto: T) {
        const { page = 0, pageSize = 25 } = dto;
        return {
            take: pageSize,
            skip: pageSize * page,
        };
    }

    static extractSortFields<T extends SortedSearchDto>(dto: T): Record<string, 'asc' | 'desc'> {
        if (!dto?.sort || dto.sort.length < 0) {
            return {};
        }

        const result = {};
        for (const field of dto.sort) {
            const [key, value] = field.split('-');
            result[key] = value;
        }

        return result;
    }
}
