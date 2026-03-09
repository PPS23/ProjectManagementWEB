export class PagedResult<T> {
    items: T[] = [];
    totalCount: number = 0;
    page: number = 0;
    pageSize: number = 0;
    totalPages: number = 0;
} 