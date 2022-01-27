import { UnprocessableEntityException } from '../../../lib/http/exception/http.exception';
import { ValidationResult } from '../../../lib/validator/validation.result';
import { Event } from '../../model/event';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

export const CREATE_EVENT = url('/api/event');

export interface CreateEventRequest extends Partial<Event> {
}

export interface CreateEventResponse extends Event {
}

export async function createEvent(data: CreateEventRequest): Promise<CreateEventResponse | ValidationResult> {
	let response;

	try {
		response = await jsonRequest(
			CREATE_EVENT,
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

	return await response.json() as CreateEventResponse;
}
