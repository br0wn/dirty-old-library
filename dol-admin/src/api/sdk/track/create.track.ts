import { UnprocessableEntityException } from '../../../lib/http/exception/http.exception';
import { ValidationResult } from '../../../lib/validator/validation.result';
import { Track } from '../../model/track';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

export const CREATE_TRACK = url('/api/track');

export interface CreateTrackRequest extends Partial<Track> {
}

export interface CreateTrackResponse extends Track {
}

export async function createTrack(data: CreateTrackRequest): Promise<CreateTrackResponse | ValidationResult> {
	let response;

	try {
		response = await jsonRequest(
			CREATE_TRACK,
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

	return await response.json() as CreateTrackResponse;
}
