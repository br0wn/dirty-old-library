import { Venue } from '../../model/venue';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

const GET_VENUE = url('/api/venue/:id');

export interface GetVenueResponse extends Venue {
}

export async function getVenue(id: string): Promise<GetVenueResponse> {
	const response = await jsonRequest(GET_VENUE.replace(':id', id));
	return response.json();
}
