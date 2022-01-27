import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, validate } from 'class-validator';
import { BCryptPasswordEncoder } from '../../../../lib/security/encoder/bcrypt.password.encoder';
import { ValidationResult } from '../../../../lib/validator/model/validation.result';
import { User } from '../model/user.entity';
import { UserEntityRepository } from '../repository/user.entity.repository';

export class CreateUserCommandData implements Partial<User> {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	firstName: string;

	@IsString()
	@IsNotEmpty()
	lastName: string;

	@IsString()
	@Length(8)
	@IsNotEmpty()
	plainPassword: string;

	@IsOptional()
	@IsString()
	imageUrl?: string;
}

export class CreateUserCommandResult {
	user?: User;
	validationResult?: ValidationResult;
}

@Injectable()
export class CreateUserCommand {

	constructor(
		private readonly userRepository: UserEntityRepository,
		protected readonly passwordEncoder: BCryptPasswordEncoder,
	) {
	}

	async execute(data: CreateUserCommandData): Promise<CreateUserCommandResult> {
		const validationResult = await this.validate(data);

		if (!!validationResult) {
			return plainToClass(CreateUserCommandResult, { validationResult });
		}

		let user = plainToClass(User, data);
		user.email = user.email.toLowerCase();
		user.password = await this.passwordEncoder.encode(data.plainPassword);

		user = await this.userRepository.save(user);
		delete user.password;

		return plainToClass(CreateUserCommandResult, { user });
	}

	async validate(data: CreateUserCommandData): Promise<ValidationResult | undefined> {
		const result = await validate(data);

		if (result.length > 0) {
			return ValidationResult.create({ errorList: result });
		}

		const existingUser = await this.userRepository.findOneBy({ email: data.email });

		if (!!existingUser) {
			return ValidationResult.create({ errorMessage: `User with email "${data.email}" already exist` });
		}

		return undefined;
	}

}
