import { Equal, FindManyOptions, FindOneOptions, In, IsNull, Repository } from 'typeorm';
import { normalizeWhereInValue } from '../../typeorm/query-builder/parameter';
import {
	EntityRepositoryInterface,
	FindBulkQuery,
	FindListQuery,
	FindOneQuery,
	FindOptions,
} from './entity.repository.interface';

export abstract class TypeOrmEntityRepository<Entity> implements EntityRepositoryInterface<Entity> {

	protected readonly repository: Repository<Entity>;

	async findOneBy(query: FindOneQuery, options?: FindOptions): Promise<Entity | undefined> {
		const findOptions = this.getFindOneByOptions(query, options);
		return this.repository.findOne(findOptions);
	}

	async findBy(query: FindListQuery, options?: FindOptions): Promise<Entity[]> {
		const findOptions = this.getFindByOptions(query, options);
		return this.repository.find(findOptions);
	}

	async findByAndCount(query: FindListQuery, options?: FindOptions): Promise<[Entity[], number]> {
		const findOptions = this.getFindByOptions(query, options);
		return this.repository.findAndCount(findOptions);
	}

	async findBulkBy(query: FindBulkQuery, options?: FindOptions): Promise<Entity[]> {
		const findOptions = this.getFindBulkByOptions(query, options);
		return this.repository.find(findOptions);
	}

	async findBulkByAndCount(query: FindBulkQuery, options?: FindOptions): Promise<[Entity[], number]> {
		const findOptions = this.getFindBulkByOptions(query, options);
		return this.repository.findAndCount(findOptions);
	}

	async save(entity: Entity) {
		return this.repository.save(entity);
	}

	async saveBatch(entityList: Entity[]) {
		return this.repository.save(entityList);
	}

	async remove(entity: Entity) {
		return this.repository.remove(entity);
	}

	async removeBatch(entityList: Entity[]) {
		return this.repository.remove(entityList);
	}

	/*
	 * Helpers
	 */

	protected getFindOneByOptions(query: FindOneQuery, options?: FindOptions): FindOneOptions {
		const where: FindOneOptions['where'] = {};

		for (const property of Object.keys(query)) {
			if (typeof query[property] !== 'undefined') {
				where[property] = this.getWhereValue(query[property]);
			}
		}

		const relations: FindOneOptions['relations'] = options?.relations;

		return { where, relations };
	}

	protected getFindByOptions(query: FindListQuery, options?: FindOptions): FindManyOptions {
		const where: FindManyOptions['where'] = {};

		for (const property of Object.keys(query)) {
			if (typeof query[property] !== 'undefined') {
				where[property] = this.getWhereValue(query[property]);
			}
		}

		const relations: FindManyOptions['relations'] = options?.relations;
		const skip = options?.skip;
		const take = options?.take;

		return { where, relations, skip, take };
	}

	protected getFindBulkByOptions(query: FindBulkQuery, options: FindOptions): FindManyOptions {
		const { id, selectAll, ...findByQuery } = query;

		if (!!id) {
			// fetch by id list
			findByQuery.id = id;

		} else if (!!selectAll) {
			// fetch all
			// 	- noop
		} else {
			// fetch none
			findByQuery.id = [null];
		}

		return this.getFindByOptions(findByQuery, options);
	}

	protected getWhereValue(value: any): any {
		if (Array.isArray(value)) {
			return In(
				normalizeWhereInValue(value),
			);
		}

		if (value === null) {
			return IsNull();
		}

		return Equal(value);
	}

}
