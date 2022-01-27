export class ListRequestQuery {
	q?: string;
	id?: string[];
	limit?: number;
	offset?: number;

	static toURLSearchParams(data: ListRequestQuery): URLSearchParams {
		const query = new URLSearchParams();

		if (!!data.id) data.id.forEach(id => query.append('id[]', id));
		if (!!data.q) query.append('q', data.q);
		if (!!data.limit) query.append('limit', data.limit.toString());
		if (!!data.offset) query.append('offset', data.offset.toString());

		return query;
	}
}
