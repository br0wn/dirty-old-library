import { AuthSessionData } from '../../../core/infrastructure/auth/auth.model';
import { User } from '../../../core/domain/user/model/user.entity';

export class AuthLoginResponseDto {
	user: User;
	accessToken: string;
	refreshToken: string;
}

export class AuthInfoResponseDto extends AuthSessionData {
}
