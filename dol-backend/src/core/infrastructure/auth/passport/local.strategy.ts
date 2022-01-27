import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';
import { Strategy } from 'passport-local';
import { LoginDto } from '../auth.dto';
import { AuthSessionData } from '../auth.model';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

	constructor(
		private readonly authService: AuthService,
	) {
		super({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true,
		});
	}

	async validate(request: Request): Promise<AuthSessionData> {
		const loginDto = plainToClass(LoginDto, request.body);

		const authSession = await this.authService.authorizeLogin(loginDto);

		if (!authSession) {
			throw new UnauthorizedException();
		}

		return authSession;
	}
}
