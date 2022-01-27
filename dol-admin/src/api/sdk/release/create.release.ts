import { UnprocessableEntityException } from '../../../lib/http/exception/http.exception';
import { ValidationResult } from '../../../lib/validator/validation.result';
import { Release } from '../../model/release';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

export const CREATE_RELEASE = url('/api/release');

export interface CreateReleaseRequest extends Partial<Release> {
}

export interface CreateReleaseResponse {
	release: Release
}

export async function createRelease(data: CreateReleaseRequest): Promise<CreateReleaseResponse | ValidationResult> {
	let response;

	try {
		response = await jsonRequest(
			CREATE_RELEASE,
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

	return await response.json() as CreateReleaseResponse;
}
