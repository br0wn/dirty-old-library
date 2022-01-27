import { Track } from '../../model/track';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

const GET_TRACK = url('/api/track/:id');

export interface GetTrackResponse extends Track {
}

export async function getTrack(id: string): Promise<GetTrackResponse> {
	const response = await jsonRequest(GET_TRACK.replace(':id', id));
	return response.json();
}
