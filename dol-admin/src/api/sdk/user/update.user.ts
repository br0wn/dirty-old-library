import { UnprocessableEntityException } from '../../../lib/http/exception/http.exception';
import { ValidationResult } from '../../../lib/validator/validation.result';
import { User } from '../../model/user';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

export const UPDATE_USER = url('/api/user/me');

export interface UpdateUserRequest {
	firstName?: string;
	lastName?: string;
	imageUrl?: string | File;
}

export interface UpdateUserResponse {
	user: User;
}

export async function updateUser(data: UpdateUserRequest): Promise<UpdateUserResponse | ValidationResult> {
	let response;

	try {
		response = await jsonRequest(UPDATE_USER, {
			method: 'post',
			body: JSON.stringify(data),
		});
	} catch (e) {
		if (!(e instanceof UnprocessableEntityException)) {
			throw e;
		}

		return await e.response.json() as ValidationResult;
	}

	return await response.json() as UpdateUserResponse;
}
