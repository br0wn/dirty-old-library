import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { GetOneQueryData } from '../../../../lib/entity/query/get.one.query';
import { addOrderBy, addWithDeleted } from '../../../../lib/entity/query/typeorm.query';
import { User } from '../model/user.entity';

export class GetUserQueryData extends GetOneQueryData {
	id?: string;
}

export class GetUserQueryResult {
	user?: User;
}

export class GetUserQuery {
	constructor(
		@InjectRepository(User) protected readonly repository: Repository<User>,
	) {
	}

	async execute(data: GetUserQueryData): Promise<GetUserQueryResult> {
		const qb = this.repository.createQueryBuilder('user');

		if (!!data.id) {
			qb.andWhere('user.id = :id', { id: data.id });
		}

		addWithDeleted(qb, data.withDeleted);
		addOrderBy(qb, data.orderBy);

		const user = await qb.getOne();

		return plainToClass(GetUserQueryResult, { user });
	}
}
