import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { BCryptPasswordEncoder } from '../../../lib/security/encoder/bcrypt.password.encoder';
import { UserEntityRepository } from '../../domain/user/repository/user.entity.repository';
import { LoginDto } from './auth.dto';
import { AuthSessionData, AuthSessionToken, JwtPayload } from './auth.model';

@Injectable()
export class AuthService {

	constructor(
		private readonly userRepository: UserEntityRepository,
		private readonly jwtService: JwtService,
		private readonly passwordEncoder: BCryptPasswordEncoder,
	) {
	}

	/*
	 * Authorization
	 */

	async authorizeLogin(data: LoginDto): Promise<AuthSessionData | undefined> {
		const user = await this.userRepository.findOneForAuth({ email: data.email });

		if (!user) {
			return undefined;
		}

		const isEqual = await this.passwordEncoder.isEqual(user.password, data.password);

		if (!isEqual) {
			return undefined;
		}

		return plainToClass(AuthSessionData, { user });
	}

	async authorizeJwt(payload: JwtPayload): Promise<AuthSessionData | undefined> {
		const user = await this.userRepository.findOneBy({ id: payload.id });

		if (!user) {
			return undefined;
		}

		return plainToClass(AuthSessionData, { user });
	}


	/*
	 * Session
	 */

	async createSessionToken(session: AuthSessionData): Promise<AuthSessionToken> {
		const accessToken = await this.createAccessToken(session);
		const refreshToken = await this.createRefreshToken(session);

		return plainToClass(AuthSessionToken, {
			accessToken,
			refreshToken,
		});
	}

	async refreshSessionToken(session: AuthSessionData): Promise<AuthSessionToken> {
		const accessToken = await this.createAccessToken(session);

		return plainToClass(AuthSessionToken, { accessToken });
	}

	async createAccessToken(authSession: AuthSessionData) {
		const payload = this.createJwtPayload(authSession);

		return this.jwtService.sign(payload, { expiresIn: '1d' });
	}

	async createRefreshToken(authSession: AuthSessionData) {
		const payload = this.createJwtPayload(authSession);

		return this.jwtService.sign(payload, { expiresIn: '356d' });
	}

	private createJwtPayload(authSession: AuthSessionData): JwtPayload {
		return { id: authSession.user.id } as JwtPayload;
	}
}
