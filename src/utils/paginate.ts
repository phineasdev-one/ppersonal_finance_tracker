import {
  paginate,
  Pagination,
  PaginationTypeEnum,
} from 'nestjs-typeorm-paginate';
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

export const paginateItems = async <T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  options: { limit: number; page: number },
  totalItems: number,
): Promise<Pagination<T>> => {
  options.limit = options.limit === 0 ? 10 : options.limit;
  options.page = options.page === 0 ? 1 : options.page;

  options.limit = options.limit > 100 ? 100 : options.limit;
  const items = await paginate<T>(queryBuilder, {
    ...options,
    paginationType: PaginationTypeEnum.TAKE_AND_SKIP,
    metaTransformer: ({ currentPage, itemCount, itemsPerPage }) => {
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      return {
        currentPage,
        itemCount,
        itemsPerPage,
        totalItems,
        totalPages: totalPages === 0 ? 1 : totalPages,
      };
    },
  });
  return items;
};
