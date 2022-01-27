import { ApiProperty } from '@nestjs/swagger';
import { plainToClass, Transform, Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { GetListQueryData } from '../entity/query/get.list.query';
import { PaginationDto } from '../entity/query/query.dto';

export class GetListRequestQueryParamsDto {

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	limit?: number;

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	offset?: number;

	@IsOptional()
	@IsString()
	q?: string;

	@ApiProperty({ type: [String], required: false })
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	@Transform(
		({ value }) => typeof value === 'string' ?
			value.split(',').map(v => v.trim()).filter(v => v.length > 0) :
			value,
	)
	id?: string[];

	toListQueryData(): GetListQueryData {
		const filterBy = { q: this.q, id: this.id };
		const pagination = this.pagination;

		return plainToClass(GetListQueryData, {
			filterBy,
			pagination,
		} as GetListQueryData);
	}

	get pagination() {
		if (!this.limit && !this.offset) {
			return undefined;
		}

		return plainToClass(PaginationDto, {
			limit: this.limit,
			offset: this.offset,
		});
	}
}
