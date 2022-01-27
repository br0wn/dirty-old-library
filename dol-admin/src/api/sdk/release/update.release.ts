import { UnprocessableEntityException } from '../../../lib/http/exception/http.exception';
import { ValidationResult } from '../../../lib/validator/validation.result';
import { Release } from '../../model/release';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

export const UPDATE_RELEASE = url('/api/release/:id');

export interface UpdateReleaseRequest extends Partial<Release> {

}

export interface UpdateReleaseResponse extends Release {
}

export async function updateRelease(id: string, data: UpdateReleaseRequest): Promise<UpdateReleaseResponse | ValidationResult> {
	let response;

	try {
		response = await jsonRequest(
			UPDATE_RELEASE.replace(':id', id),
			{
				method: 'POST',
				body: JSON.stringify(data),
			},
		);
	} catch (e) {
		if (!(e instanceof UnprocessableEntityException)) {
			throw e;
		}

		return await e.response.json() as ValidationResult;
	}

	return await response.json() as UpdateReleaseResponse;
}
