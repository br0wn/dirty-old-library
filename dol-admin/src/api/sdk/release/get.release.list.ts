import { Release } from '../../model/release';
import { ListRequestQuery } from '../../model/request.query';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

const GET_RELEASE_LIST = url('/api/release');

export interface GetReleaseListRequest extends ListRequestQuery {
}

export interface GetReleaseListResponse {
	itemList: Release[];
	totalItemCount: number,
}

export async function getReleaseList(data: GetReleaseListRequest): Promise<GetReleaseListResponse> {
	const query = ListRequestQuery.toURLSearchParams(data);

	const response = await jsonRequest(GET_RELEASE_LIST + '?' + query.toString());
	return response.json();
}
