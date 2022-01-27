import { IncludeDto, OrderByDto } from './query.dto';

export class GetOneQueryData {
	orderBy?: OrderByDto;
	include?: IncludeDto;
	withDeleted?: boolean;
}
