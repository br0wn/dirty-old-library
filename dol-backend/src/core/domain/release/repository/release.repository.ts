import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmEntityRepository } from '../../../../lib/entity/repository/type.orm.entity.repository';
import { Release } from '../model/release.entity';

@Injectable()
export class ReleaseEntityRepository extends TypeOrmEntityRepository<Release> {

	constructor(
		@InjectRepository(Release) protected readonly repository: Repository<Release>,
	) {
		super();
	}
}
