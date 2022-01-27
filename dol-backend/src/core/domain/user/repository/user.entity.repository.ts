import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneQuery } from '../../../../lib/entity/repository/entity.repository.interface';
import { TypeOrmEntityRepository } from '../../../../lib/entity/repository/type.orm.entity.repository';
import { User } from '../model/user.entity';

export interface FindOneUserQuery extends FindOneQuery {
	email?: string;
	passwordResetToken?: string;
}

export class UserEntityRepository extends TypeOrmEntityRepository<User> {

	constructor(
		@InjectRepository(User) protected readonly repository: Repository<User>,
	) {
		super();
	}

	async findOneBy(query: FindOneUserQuery): Promise<User | undefined> {
		const qb = this.repository.createQueryBuilder('user');

		if (!!query.id) {
			qb.andWhere('user.id = :id', { id: query.id });
		}
		if (!!query.email) {
			qb.andWhere('LOWER(user.email) = :email', { email: query.email.toLowerCase() });
		}
		if (!!query.passwordResetToken) {
			qb.andWhere('user.passwordResetToken = :passwordResetToken', { passwordResetToken: query.passwordResetToken });
		}

		return qb.getOne();
	}

	async findOneForAuth(query: { email: string } | { id: string }): Promise<User | undefined> {
		const qb = this.repository.createQueryBuilder('user');

		qb.addSelect('user.password');

		if ('email' in query) {
			qb.where('LOWER(user.email) = :email', { email: query.email.toLowerCase() });
		} else if ('id' in query) {
			qb.where('user.id = :id', { id: query.id });
		} else {
			return undefined;
		}

		return qb.getOne();
	}
}
