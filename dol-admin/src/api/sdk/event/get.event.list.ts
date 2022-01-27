import { Event } from '../../model/event';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

const GET_EVENT_LIST = url('/api/event');

export interface GetEventListRequest {
}

export interface GetEventListResponse {
	data: Event[];
	count: number,
	total: number,
	page: number,
	pageCount: number
}

export async function getEventList(data: GetEventListRequest): Promise<GetEventListResponse> {
	const response = await jsonRequest(GET_EVENT_LIST);
	return response.json();
}
