import { UnprocessableEntityException } from '../../../lib/http/exception/http.exception';
import { ValidationResult } from '../../../lib/validator/validation.result';
import { Artist } from '../../model/artist';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

export const UPDATE_ARTIST = url('/api/artist/:id');

export interface UpdateArtistRequest extends Partial<Artist> {

}

export interface UpdateArtistResponse extends Artist {
}

export async function updateArtist(id: string, data: UpdateArtistRequest): Promise<UpdateArtistResponse | ValidationResult> {
	let response;

	try {
		response = await jsonRequest(
			UPDATE_ARTIST.replace(':id', id),
			{
				method: 'PATCH',
				body: JSON.stringify(data),
			},
		);
	} catch (e) {
		if (!(e instanceof UnprocessableEntityException)) {
			throw e;
		}

		return await e.response.json() as ValidationResult;
	}

	return await response.json() as UpdateArtistResponse;
}
