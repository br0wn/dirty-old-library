import { UnprocessableEntityException } from '../../../lib/http/exception/http.exception';
import { ValidationResult } from '../../../lib/validator/validation.result';
import { Artist } from '../../model/artist';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

export const CREATE_ARTIST = url('/api/artist');

export interface CreateArtistRequest extends Partial<Artist> {
}

export interface CreateArtistResponse extends Artist {
}

export async function createArtist(data: CreateArtistRequest): Promise<CreateArtistResponse | ValidationResult> {
	let response;

	try {
		response = await jsonRequest(
			CREATE_ARTIST,
			{
				method: 'post',
				body: JSON.stringify(data),
			},
		);
	} catch (e) {
		if (!(e instanceof UnprocessableEntityException)) {
			throw e;
		}

		return await e.response.json() as ValidationResult;
	}

	return await response.json() as CreateArtistResponse;
}
