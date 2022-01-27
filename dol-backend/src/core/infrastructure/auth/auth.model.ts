import { User } from '../../domain/user/model/user.entity';

export class AuthSessionToken {
	accessToken: string;
	refreshToken?: string;
}

export class AuthSessionData {
	user: User;
}

export interface JwtPayload {
	id: User['id'];
	email: User['email'];
}

