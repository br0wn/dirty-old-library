import { Injectable } from '@nestjs/common';
import { plainToClass, Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsOptional, IsString, Length, validate, ValidateNested } from 'class-validator';
import { BCryptPasswordEncoder } from '../../../../lib/security/encoder/bcrypt.password.encoder';
import { ValidationResult } from '../../../../lib/validator/model/validation.result';
import { User } from '../model/user.entity';
import { UserEntityRepository } from '../repository/user.entity.repository';

export class UpdatePasswordDto {
	@IsString()
	@IsNotEmpty()
	currentPassword: string;

	@IsString()
	@Length(8)
	@IsNotEmpty()
	plainPassword: string;
}

export class UpdateUserCommandData implements Partial<User> {
	@IsString()
	@IsOptional()
	firstName?: string;

	@IsString()
	@IsOptional()
	lastName?: string;

	@IsOptional()
	@IsString()
	imageUrl?: string;

	@IsOptional()
	@IsObject()
	@ValidateNested()
	@Type(() => UpdatePasswordDto)
	changePassword?: UpdatePasswordDto;
}

export class UpdateUserCommandResult {
	user?: User;
	validationResult?: ValidationResult;
	isNotFound?: boolean;
}

@Injectable()
export class UpdateUserCommand {

	constructor(
		private readonly userRepository: UserEntityRepository,
		protected readonly passwordEncoder: BCryptPasswordEncoder,
	) {
	}

	async execute(userId: User['id'], data: UpdateUserCommandData): Promise<UpdateUserCommandResult> {
		const validationResult = await this.validate(data);

		if (!!validationResult) {
			return plainToClass(UpdateUserCommandResult, { validationResult });
		}

		let user;

		if (!!data.changePassword) {
			user = await this.userRepository.findOneForAuth({ id: userId });
		} else {
			user = await this.userRepository.findOneBy({ id: userId });
		}

		if (!user) {
			return plainToClass(UpdateUserCommandResult, { isNotFound: true });
		}

		if (!!data.changePassword) {
			const isCurrentPasswordValid = await this.passwordEncoder.isEqual(user.password, data.changePassword.currentPassword);

			if (!isCurrentPasswordValid) {
				return plainToClass(UpdateUserCommandResult, {
					validationResult: ValidationResult.createFromErrorMessage(`Current password is incorrect`),
				});
			}
		}

		if (!!data.firstName) {
			user.firstName = data.firstName;
		}
		if (!!data.lastName) {
			user.lastName = data.lastName;
		}
		if (!!data.imageUrl) {
			user.imageUrl = data.imageUrl;
		}
		if (!!data.changePassword) {
			user.password = await this.passwordEncoder.encode(data.changePassword.plainPassword);
		}

		user = await this.userRepository.save(user);
		delete user.password;

		return plainToClass(UpdateUserCommandResult, { user });
	}

	async validate(data: UpdateUserCommandData): Promise<ValidationResult | undefined> {
		const result = await validate(data);

		if (result.length > 0) {
			return ValidationResult.create({ errorList: result });
		}

		return undefined;
	}

}
