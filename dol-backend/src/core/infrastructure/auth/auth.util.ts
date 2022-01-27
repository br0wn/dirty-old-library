import { Request } from 'express';
import { REQUEST_AUTH_PROPERTY } from './auth.constant';
import { AuthSessionData } from './auth.model';

export function getRequestAuth(request: Request): AuthSessionData {
	return request[REQUEST_AUTH_PROPERTY];
}
