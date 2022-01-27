import { UnprocessableEntityException } from '../../../lib/http/exception/http.exception';
import { ValidationResult } from '../../../lib/validator/validation.result';
import { Venue } from '../../model/venue';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

export const CREATE_VENUE = url('/api/venue');

export interface CreateVenueRequest extends Partial<Venue> {
}

export interface CreateVenueResponse extends Venue {
}

export async function createVenue(data: CreateVenueRequest): Promise<CreateVenueResponse | ValidationResult> {
	let response;

	try {
		response = await jsonRequest(
			CREATE_VENUE,
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

	return await response.json() as CreateVenueResponse;
}
