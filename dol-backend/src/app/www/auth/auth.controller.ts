import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	UnauthorizedException,
	UnprocessableEntityException,
	UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
	ApiBearerAuth,
	ApiBody,
	ApiOkResponse,
	ApiTags,
	ApiUnauthorizedResponse,
	ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { AuthSession } from '../../../core/infrastructure/auth/auth.decorator';
import { LoginDto } from '../../../core/infrastructure/auth/auth.dto';
import { AuthSessionData } from '../../../core/infrastructure/auth/auth.model';
import { AuthService } from '../../../core/infrastructure/auth/auth.service';
import { ResetPasswordCommand, ResetPasswordCommandData } from '../../../core/domain/user/command/reset.password.command';
import { UpdatePasswordCommand, UpdatePasswordCommandData } from '../../../core/domain/user/command/update.password.command';
import { ValidationResult } from '../../../lib/validator/model/validation.result';
import { AuthInfoResponseDto, AuthLoginResponseDto } from './auth.dto';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {

	constructor(
		private readonly resetPasswordCommand: ResetPasswordCommand,
		private readonly updatePasswordCommand: UpdatePasswordCommand,
		private readonly authService: AuthService,
	) {
	}

	@ApiBody({ type: LoginDto })
	@ApiOkResponse({ type: AuthLoginResponseDto })
	@ApiUnauthorizedResponse({ type: UnauthorizedException })
	@UseGuards(AuthGuard('local'))
	@Post('login')
	@HttpCode(HttpStatus.OK)
	async login(
		@AuthSession() session: AuthSessionData,
	) {
		const sessionToken = await this.authService.createSessionToken(session);

		return plainToClass(AuthLoginResponseDto, {
			...session,
			...sessionToken,
		});
	}

	@ApiBearerAuth()
	@ApiUnauthorizedResponse({ type: UnauthorizedException })
	@UseGuards(AuthGuard('jwt'))
	@Post('logout')
	@HttpCode(HttpStatus.OK)
	async logout() {
		return null;
	}

	@ApiBearerAuth()
	@ApiUnauthorizedResponse({ type: UnauthorizedException })
	@UseGuards(AuthGuard('jwt'))
	@Post('token')
	@HttpCode(HttpStatus.OK)
	async token(
		@AuthSession() session: AuthSessionData,
	) {
		return this.authService.refreshSessionToken(session);
	}

	@ApiBearerAuth()
	@ApiOkResponse({ type: AuthInfoResponseDto })
	@ApiUnauthorizedResponse({ type: UnauthorizedException })
	@UseGuards(AuthGuard('jwt'))
	@Get('info')
	async info(
		@AuthSession() session: AuthSessionData,
	) {
		return plainToClass(AuthInfoResponseDto, session);
	}

	@ApiUnprocessableEntityResponse({ type: ValidationResult })
	@Post('password/reset')
	@HttpCode(HttpStatus.OK)
	async resetPassword(
		@Body() resetPasswordDto: ResetPasswordCommandData,
	) {
		const commandData = plainToClass(ResetPasswordCommandData, resetPasswordDto);
		const commandResult = await this.resetPasswordCommand.execute(commandData);

		if (commandResult.validationResult) {
			throw new UnprocessableEntityException(commandResult.validationResult);
		}

		return null;
	}

	@ApiUnprocessableEntityResponse({ type: ValidationResult })
	@Post('password')
	@HttpCode(HttpStatus.OK)
	async updatePassword(
		@Body() updatePasswordDto: UpdatePasswordCommandData,
	) {
		const commandData = plainToClass(UpdatePasswordCommandData, updatePasswordDto);
		const commandResult = await this.updatePasswordCommand.execute(commandData);

		if (!!commandResult.validationResult) {
			throw new UnprocessableEntityException(commandResult.validationResult);
		}

		return null;
	}

}
