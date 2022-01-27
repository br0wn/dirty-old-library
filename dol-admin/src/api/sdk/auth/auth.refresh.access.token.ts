import { UnauthorizedException } from '../../../lib/http/exception/http.exception';
import { getRefreshToken, setAccessToken, setRefreshToken } from '../../auth/token';
import { authorizationHeader } from '../../request/header';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

export const AUTH_TOKEN = url('/api/auth/token');


export interface AuthTokenResponse {
	accessToken?: string;
}

export async function authRefreshAccessToken(): Promise<AuthTokenResponse> {
	const refreshToken = getRefreshToken();

	if (!refreshToken) {
		return {};
	}

	let response;

	try {
		response = await jsonRequest(AUTH_TOKEN, {
			method: 'post',
			headers: authorizationHeader(refreshToken),
		});
	} catch (e) {
		if (!(e instanceof UnauthorizedException)) {
			throw e;
		}

		setRefreshToken(undefined);
		return {};
	}

	const tokenResponse = await response.json() as AuthTokenResponse;

	setAccessToken(tokenResponse.accessToken);
	delete tokenResponse.accessToken;

	return tokenResponse;
}
