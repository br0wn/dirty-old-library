import { Event } from '../../model/event';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

const GET_EVENT = url('/api/event/:id');

export interface GetEventResponse extends Event {
}

export async function getEvent(id: string): Promise<GetEventResponse> {
	const response = await jsonRequest(GET_EVENT.replace(':id', id));
	return response.json();
}
