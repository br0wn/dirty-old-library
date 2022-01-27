import { Venue } from '../../model/venue';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

const GET_VENUE_LIST = url('/api/venue');

export interface GetVenueListRequest {
}

export interface GetVenueListResponse {
	data: Venue[];
	count: number,
	total: number,
	page: number,
	pageCount: number
}

export async function getVenueList(data: GetVenueListRequest): Promise<GetVenueListResponse> {
	const response = await jsonRequest(GET_VENUE_LIST);
	return response.json();
}
