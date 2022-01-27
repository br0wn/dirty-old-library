import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Post,
	Query,
	UnprocessableEntityException,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse, PickType } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import {
	CreateReleaseCommand,
	CreateReleaseCommandData,
	CreateReleaseCommandResult,
} from '../../../core/domain/release/command/create.release.command';
import {
	UpdateReleaseCommand,
	UpdateReleaseCommandData,
	UpdateReleaseCommandResult,
} from '../../../core/domain/release/command/update.release.command';
import { Release } from '../../../core/domain/release/model/release.entity';
import {
	GetReleaseListQuery,
	GetReleaseListQueryData,
	GetReleaseListQueryResult,
} from '../../../core/domain/release/query/get.release.list.query';
import { GetListRequestQueryParamsDto } from '../../../lib/www/www.dto';

@ApiTags('release')
@Controller('api/release')
export class ReleaseController {

	constructor(
		private readonly createReleaseCommand: CreateReleaseCommand,
		private readonly getReleaseListQuery: GetReleaseListQuery,
		private readonly updateReleaseCommand: UpdateReleaseCommand,
	) {
	}

	@ApiOkResponse({ type: GetReleaseListQueryResult })
	@Get('')
	async getList(
		@Query() query: GetListRequestQueryParamsDto,
	) {
		const queryData = plainToClass(GetReleaseListQueryData, {
			...query.toListQueryData(),
			include: {
				releaseMaster: true,
				artistList: true,
				labelList: true,
			},
		} as GetReleaseListQueryData);

		return await this.getReleaseListQuery.execute(queryData);
	}

	@ApiOkResponse({ type: Release })
	@Get(':id')
	async getOne(
		@Param('id') id: string,
	) {
		const queryData = plainToClass(GetReleaseListQueryData, {
			filterBy: { id: [id] },
			include: {
				releaseMaster: true,
				artistList: true,
				labelList: true,
			},
		} as GetReleaseListQueryData);

		const { itemList } = await this.getReleaseListQuery.execute(queryData);

		if (!itemList[0]) {
			throw new NotFoundException();
		}

		return itemList[0];
	}

	@ApiOkResponse({ type: Release })
	@ApiUnprocessableEntityResponse({ type: PickType(CreateReleaseCommandResult, ['validationResult']) })
	@Post('')
	async create(
		@Body() commandData: CreateReleaseCommandData,
	) {
		const commandResult = await this.createReleaseCommand.execute(commandData);

		if (!!commandResult.validationResult) {
			throw new UnprocessableEntityException(commandResult.validationResult);
		}

		const queryData = plainToClass(GetReleaseListQueryData, {
			filterBy: { id: [commandResult.release.id] },
			include: {
				releaseMaster: true,
				artistList: true,
				labelList: true,
			},
		} as GetReleaseListQueryData);

		const { itemList } = await this.getReleaseListQuery.execute(queryData);
		return itemList[0];
	}

	@ApiOkResponse({ type: Release })
	@ApiUnprocessableEntityResponse({ type: PickType(UpdateReleaseCommandResult, ['validationResult']) })
	@Post(':id')
	async update(
		@Param('id') id: string,
		@Body() commandData: UpdateReleaseCommandData,
	) {
		const commandResult = await this.updateReleaseCommand.execute(id, commandData);

		if (!!commandResult.isNotFound) {
			throw new NotFoundException();
		}
		if (!!commandResult.validationResult) {
			throw new UnprocessableEntityException(commandResult.validationResult);
		}

		const queryData = plainToClass(GetReleaseListQueryData, {
			filterBy: { id: [commandResult.release.id] },
			include: {
				releaseMaster: true,
				artistList: true,
				labelList: true,
			},
		} as GetReleaseListQueryData);

		const { itemList } = await this.getReleaseListQuery.execute(queryData);
		return itemList[0];
	}
}
