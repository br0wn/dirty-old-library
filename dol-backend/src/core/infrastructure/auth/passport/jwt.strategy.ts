import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthSessionData, JwtPayload } from '../auth.model';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategyOptions {
	jwtSecret: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

	constructor(
		private readonly options: JwtStrategyOptions,
		private readonly authService: AuthService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				ExtractJwt.fromUrlQueryParameter('accessToken'),
				ExtractJwt.fromAuthHeaderAsBearerToken(),
			]),
			ignoreExpiration: false,
			secretOrKey: options.jwtSecret,
		});
	}

	async validate(payload: JwtPayload): Promise<AuthSessionData> {
		const authSession = await this.authService.authorizeJwt(payload);

		if (!authSession) {
			throw new UnauthorizedException();
		}

		return authSession;
	}
}
