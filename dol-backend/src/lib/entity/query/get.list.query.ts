import { FilterByDto, IncludeDto, OrderByDto, PaginationDto } from './query.dto';

export class GetListQueryData {
	filterBy: FilterByDto;
	orderBy?: OrderByDto;
	pagination?: PaginationDto;
	include?: IncludeDto;
	withDeleted?: boolean;
}
