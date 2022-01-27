import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { GetListQueryData } from '../../../../lib/entity/query/get.list.query';
import { addOrderBy, addPagination } from '../../../../lib/entity/query/typeorm.query';
import { normalizeWhereInValue } from '../../../../lib/typeorm/query-builder/parameter';
import { Release } from '../model/release.entity';

export class GetReleaseListQueryData extends GetListQueryData {
	include?: {
		releaseMaster?: boolean;
		artistList?: boolean;
		labelList?: boolean;
	};
}

export class GetReleaseListQueryResult {
	itemList: Release[];
	totalItemCount: number;
}

@Injectable()
export class GetReleaseListQuery {

	constructor(
		@InjectRepository(Release) private readonly repository: Repository<Release>,
	) {
	}

	async execute(data: GetReleaseListQueryData): Promise<GetReleaseListQueryResult> {
		const qb = this.repository.createQueryBuilder('release');

		if (!!data.include.artistList) {
			qb.leftJoinAndSelect('release.artistList', 'releaseArtist');
			qb.leftJoinAndSelect('releaseArtist.artist', 'artist');
		}
		if (!!data.include.labelList) {
			qb.leftJoinAndSelect('release.labelList', 'releaseLabel');
			qb.leftJoinAndSelect('releaseLabel.label', 'label');
		}
		if (!!data.include.releaseMaster) {
			qb.leftJoinAndSelect('release.releaseMaster', 'releaseMaster');
		}

		if (!!data.filterBy?.id) {
			qb.andWhere('release.id IN (:...id)', { id: normalizeWhereInValue(data.filterBy.id) });
		}
		if (!!data.filterBy?.q && data.filterBy?.q.length > 0) {
			qb.andWhere('LOWER( release.name ) LIKE :name', { name: `%${data.filterBy.q.toLowerCase()}%` });
		}

		addPagination(qb, data.pagination);
		addOrderBy(qb, data.orderBy, 'release.name', 'ASC');

		const [itemList, totalItemCount] = await qb.getManyAndCount();

		return plainToClass(GetReleaseListQueryResult, { itemList, totalItemCount });
	}

}
