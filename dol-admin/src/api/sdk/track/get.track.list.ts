import { Track } from '../../model/track';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

const GET_TRACK_LIST = url('/api/track');

export interface GetTrackListRequest {
}

export interface GetTrackListResponse {
	data: Track[];
	count: number,
	total: number,
	page: number,
	pageCount: number
}

export async function getTrackList(data: GetTrackListRequest): Promise<GetTrackListResponse> {
	const response = await jsonRequest(GET_TRACK_LIST);
	return response.json();
}
