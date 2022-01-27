export class PaginationDto {
	limit?: number;
	offset?: number;
}

export class OrderByDto {
	[propertyPath: string]: 'asc' | 'desc';
}

export class IncludeDto {
	[propertyPath: string]: boolean | IncludeDto;
}

export class FilterByDto {
	id?: string[];
	q?: string;

	[propertyPath: string]: any;
}
