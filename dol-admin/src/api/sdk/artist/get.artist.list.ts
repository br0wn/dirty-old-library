import { Artist } from '../../model/artist';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

const GET_ARTIST_LIST = url('/api/artist');

export interface GetArtistListRequest {
}

export interface GetArtistListResponse {
	data: Artist[];
	count: number,
	total: number,
	page: number,
	pageCount: number
}

export async function getArtistList(data: GetArtistListRequest): Promise<GetArtistListResponse> {
	const response = await jsonRequest(GET_ARTIST_LIST);
	return response.json();
}
