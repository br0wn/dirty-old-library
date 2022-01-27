import { clearAllTokens } from '../../auth/token';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

export const AUTH_LOGOUT = url('/api/auth/logout');

export async function authLogout(): Promise<void> {
	await jsonRequest(AUTH_LOGOUT, {
		method: 'post',
	});

	clearAllTokens();
}
