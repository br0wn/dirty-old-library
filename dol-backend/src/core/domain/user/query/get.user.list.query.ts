import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { GetListQueryData } from '../../../../lib/entity/query/get.list.query';
import { addOrderBy, addPagination, addWithDeleted } from '../../../../lib/entity/query/typeorm.query';
import { normalizeWhereInValue } from '../../../../lib/typeorm/query-builder/parameter';
import { User } from '../model/user.entity';

export class GetUserListQueryData extends GetListQueryData {
	idList?: string[];
}

export class GetUserListQueryResult {
	userList: User[];
	totalItemCount: number;
}

export class GetUserListQuery {

	constructor(
		@InjectRepository(User) protected readonly repository: Repository<User>,
	) {
	}

	async execute(data: GetUserListQueryData): Promise<GetUserListQueryResult> {
		const qb = this.repository.createQueryBuilder('user');

		if (!!data.idList) {
			qb.andWhere('user.id IN (:...idList)', { idList: normalizeWhereInValue(data.idList) });
		}

		// ---
		addWithDeleted(qb, data.withDeleted);
		addPagination(qb, data.pagination);
		addOrderBy(qb, data.orderBy, 'user.lastName', 'ASC');

		const [userList, totalItemCount] = await qb.getManyAndCount();

		return plainToClass(GetUserListQueryResult, {
			userList, totalItemCount,
		});
	}

}
