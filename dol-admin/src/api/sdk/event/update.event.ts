import { UnprocessableEntityException } from '../../../lib/http/exception/http.exception';
import { ValidationResult } from '../../../lib/validator/validation.result';
import { Event } from '../../model/event';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

export const UPDATE_EVENT = url('/api/event/:id');

export interface UpdateEventRequest extends Partial<Event> {

}

export interface UpdateEventResponse extends Event {
}

export async function updateEvent(id: string, data: UpdateEventRequest): Promise<UpdateEventResponse | ValidationResult> {
	let response;

	try {
		response = await jsonRequest(
			UPDATE_EVENT.replace(':id', id),
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

	return await response.json() as UpdateEventResponse;
}
