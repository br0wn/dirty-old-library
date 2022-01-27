import { UnprocessableEntityException } from '../../../lib/http/exception/http.exception';
import { ValidationResult } from '../../../lib/validator/validation.result';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

export const AUTH_RESET_PASSWORD = url('/api/auth/password/reset');

export interface AuthResetPasswordRequest {
	email: string;
}

export async function authResetPassword(data: AuthResetPasswordRequest): Promise<ValidationResult | undefined> {
	try {
		await jsonRequest(AUTH_RESET_PASSWORD, {
			method: 'post',
			body: JSON.stringify(data),
		});
	} catch (e) {
		if (!(e instanceof UnprocessableEntityException)) {
			throw e;
		}

		return await e.response.json() as ValidationResult;
	}
}
