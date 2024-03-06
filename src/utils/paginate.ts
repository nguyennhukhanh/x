import type { Pagination } from 'src/common/class/pagination';
import type { PaginationQuery } from 'src/shared/dto/pagination.query';
import type { SelectQueryBuilder } from 'typeorm';

export enum FetchType {
  RAW = 'RAW',
  MANAGED = 'MANAGED',
}

export class FetchResult<T> {
  items: Array<Partial<T>> | any;
  meta: Pagination;
}

/**
 * This function takes a queryBuilder, a pagination object, and a fetch type, and then returns a paginated object.
 *
 * @param {SelectQueryBuilder<T>} queryBuilder - The queryBuilder object from TypeORM, containing the SQL query information.
 * @param {PaginationQuery} pagination - The object containing pagination information, including the current page and the number of items per page.
 * @param {FetchType} fetchType - The type of fetch operation to perform. Can be either `RAW` (for getRawMany) or `MANAGED` (for getMany).
 *
 * @returns {Promise<FetchResult<T>>} - Returns a Promise containing an object. This object includes an array of items and a meta object containing pagination information.
 */
export async function paginateEntities<T>(
  queryBuilder: SelectQueryBuilder<T>,
  pagination: PaginationQuery,
  fetchType: FetchType,
): Promise<FetchResult<T>> {
  const { page, limit } = pagination;

  const take = limit > 20 || !limit ? 20 : limit;
  const skip = (page - 1) * take || 0;

  const totalItems = await queryBuilder.getCount();
  const items = await (fetchType === FetchType.RAW
    ? queryBuilder.clone().offset(skip).limit(take).getRawMany()
    : queryBuilder.clone().offset(skip).limit(take).getMany());

  const itemCount = items.length;
  const itemsPerPage = Number(take);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = Number(page) || 1;
  const meta = {
    itemCount,
    totalItems,
    itemsPerPage,
    totalPages,
    currentPage,
  };

  return {
    items,
    meta,
  };
}
