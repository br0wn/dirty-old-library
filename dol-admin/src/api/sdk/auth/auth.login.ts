import { UnauthorizedException } from '../../../lib/http/exception/http.exception';
import { setAccessToken, setRefreshToken } from '../../auth/token';
import { User } from '../../model/user';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

export const AUTH_LOGIN = url('/api/auth/login');

export interface AuthLoginRequest {
	email: string;
	password: string;
}

export interface AuthLoginResponse {
	user?: User;
	accessToken?: string;
	refreshToken?: string;
}

export async function authLogin(data: AuthLoginRequest): Promise<AuthLoginResponse> {
	let response;

	try {
		response = await jsonRequest(AUTH_LOGIN, {
			method: 'post',
			body: JSON.stringify(data),
		});
	} catch (e) {
		if (!(e instanceof UnauthorizedException)) {
			throw e;
		}

		return {};
	}

	const loginResponse = await response.json() as AuthLoginResponse;

	setAccessToken(loginResponse.accessToken);
	delete loginResponse.accessToken;

	setRefreshToken(loginResponse.refreshToken);
	delete loginResponse.refreshToken;

	return loginResponse;
}
