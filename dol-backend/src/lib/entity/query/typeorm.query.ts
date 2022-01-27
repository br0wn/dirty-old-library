import { SelectQueryBuilder } from 'typeorm';
import { OrderByDto, PaginationDto } from './query.dto';

export function addPagination<Entity>(qb: SelectQueryBuilder<Entity>, pagination?: PaginationDto) {
	if (!pagination) return;

	qb.skip(pagination.offset);
	qb.take(pagination.limit);
}

export function addOrderBy<Entity>(
	qb: SelectQueryBuilder<Entity>,
	orderBy?: OrderByDto,
	defaultSort?: string,
	defaultOrder?: 'ASC' | 'DESC',
) {
	if (!!orderBy) {
		for (const property of Object.keys(orderBy)) {
			const direction = orderBy[property];
			qb.addOrderBy(property, direction as ('ASC' | 'DESC'));
		}
	} else if (!!defaultSort) {
		qb.addOrderBy(defaultSort, defaultOrder);
	}
}

export function addWithDeleted<Entity>(qb: SelectQueryBuilder<Entity>, withDeleted?: boolean) {
	if (!withDeleted) {
		qb.andWhere(`(${notDeletedCondition(qb.alias)})`);
	}
}

/**
 * Returns SQL condition that excludes deleted entries
 */
export function notDeletedCondition(alias) {
	return `${alias}.deletedAt IS NULL OR ${alias}.deletedAt > NOW()`;
}
