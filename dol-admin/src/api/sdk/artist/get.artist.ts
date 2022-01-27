import { Artist } from '../../model/artist';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

const GET_ARTIST = url('/api/artist/:id');

export interface GetArtistResponse extends Artist {
}

export async function getArtist(id: string): Promise<GetArtistResponse> {
	const response = await jsonRequest(GET_ARTIST.replace(':id', id));
	return response.json();
}
