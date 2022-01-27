import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	NotFoundException,
	Post,
	UnauthorizedException,
	UnprocessableEntityException,
	UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
	ApiBearerAuth,
	ApiOkResponse,
	ApiTags,
	ApiUnauthorizedResponse,
	ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { UpdateUserCommand, UpdateUserCommandData } from '../../../core/domain/user/command/update.user.command';
import { GetUserQuery, GetUserQueryData } from '../../../core/domain/user/query/get.user.query';
import { AuthSession } from '../../../core/infrastructure/auth/auth.decorator';
import { AuthSessionData } from '../../../core/infrastructure/auth/auth.model';
import { ValidationResult } from '../../../lib/validator/model/validation.result';
import { GetUserResponseDto } from './user.dto';

@ApiTags('user')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ type: UnauthorizedException })
@Controller('api/user')
export class UserController {

	constructor(
		private readonly getUserQuery: GetUserQuery,
		private readonly updateUserCommand: UpdateUserCommand,
	) {
	}

	@ApiOkResponse({ type: GetUserResponseDto })
	@UseGuards(AuthGuard('jwt'))
	@Get('me')
	async getOwnUser(
		@AuthSession() session: AuthSessionData,
	) {
		const queryData = plainToClass(GetUserQueryData, { id: session.user.id });
		const queryResult = await this.getUserQuery.execute(queryData);

		return plainToClass(GetUserResponseDto, { user: queryResult.user });
	}

	@ApiOkResponse({ type: GetUserResponseDto })
	@ApiUnprocessableEntityResponse({ type: ValidationResult })
	@UseGuards(AuthGuard('jwt'))
	@Post('me')
	@HttpCode(HttpStatus.OK)
	async updateOwnUser(
		@AuthSession() session: AuthSessionData,
		@Body() userDto: UpdateUserCommandData,
	) {
		const commandData = plainToClass(UpdateUserCommandData, userDto);
		const commandResult = await this.updateUserCommand.execute(session.user.id, commandData);

		if (!!commandResult.isNotFound) {
			throw new NotFoundException();
		}
		if (!!commandResult.validationResult) {
			throw new UnprocessableEntityException(commandResult.validationResult);
		}

		return commandResult;
	}

}
