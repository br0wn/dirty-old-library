import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthSessionData } from './auth.model';
import { getRequestAuth } from './auth.util';

export const AuthSession = createParamDecorator(
	(data, ctx: ExecutionContext): AuthSessionData | undefined => {
		const request = ctx.switchToHttp().getRequest();
		return getRequestAuth(request);
	},
);
