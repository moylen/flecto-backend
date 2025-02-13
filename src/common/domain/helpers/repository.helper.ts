import { PaginatorInterface } from '../interfaces/paginator.interface';
import { PaginationInterface } from '../interfaces/PaginationInterface';

export class RepositoryHelper {
    static applyPagination(dto: PaginatorInterface): PaginationInterface {
        const { page = 0, pageSize = 25 } = dto;
        return {
            take: pageSize,
            skip: pageSize * page,
        };
    }
}
