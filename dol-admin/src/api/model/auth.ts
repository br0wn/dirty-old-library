import { User } from './user';

export interface AuthSession {
	user: User;
	accessToken: string;
	refreshToken: string;
}

export interface AuthInfo {
	user: User;
}
