import { UnprocessableEntityException } from '../../../lib/http/exception/http.exception';
import { ValidationResult } from '../../../lib/validator/validation.result';
import { Venue } from '../../model/venue';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

export const UPDATE_VENUE = url('/api/venue/:id');

export interface UpdateVenueRequest extends Partial<Venue> {

}

export interface UpdateVenueResponse extends Venue {
}

export async function updateVenue(id: string, data: UpdateVenueRequest): Promise<UpdateVenueResponse | ValidationResult> {
	let response;

	try {
		response = await jsonRequest(
			UPDATE_VENUE.replace(':id', id),
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

	return await response.json() as UpdateVenueResponse;
}
