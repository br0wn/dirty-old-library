import { UnprocessableEntityException } from '../../../lib/http/exception/http.exception';
import { ValidationResult } from '../../../lib/validator/validation.result';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

export const AUTH_LOGIN = url('/api/auth/password');

export interface AuthUpdatePasswordRequest {
	confirmationToken: string;
	plainPassword: string;
}

export async function authUpdatePassword(data: AuthUpdatePasswordRequest): Promise<undefined | ValidationResult> {
	try {
		await jsonRequest(AUTH_LOGIN, {
			method: 'post',
			body: JSON.stringify(data),
		});
	} catch (e) {
		if (!(e instanceof UnprocessableEntityException)) {
			throw e;
		}

		return e.response.json();
	}

	return undefined;
}
