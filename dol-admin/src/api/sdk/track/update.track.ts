import { UnprocessableEntityException } from '../../../lib/http/exception/http.exception';
import { ValidationResult } from '../../../lib/validator/validation.result';
import { Track } from '../../model/track';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

export const UPDATE_TRACK = url('/api/track/:id');

export interface UpdateTrackRequest extends Partial<Track> {

}

export interface UpdateTrackResponse extends Track {
}

export async function updateTrack(id: string, data: UpdateTrackRequest): Promise<UpdateTrackResponse | ValidationResult> {
	let response;

	try {
		response = await jsonRequest(
			UPDATE_TRACK.replace(':id', id),
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

	return await response.json() as UpdateTrackResponse;
}
