import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IsNotEmpty, IsString, Length, validate } from 'class-validator';
import { BCryptPasswordEncoder } from '../../../../lib/security/encoder/bcrypt.password.encoder';
import { ValidationResult } from '../../../../lib/validator/model/validation.result';
import { User } from '../model/user.entity';
import { UserEntityRepository } from '../repository/user.entity.repository';

export class UpdatePasswordCommandData {
	@IsString()
	@IsNotEmpty()
	passwordResetToken: string;

	@IsString()
	@Length(8)
	@IsNotEmpty()
	plainPassword: string;
}

export class UpdatePasswordCommandResult {
	user?: User;
	validationResult?: ValidationResult;
}

@Injectable()
export class UpdatePasswordCommand {

	constructor(
		private readonly userRepository: UserEntityRepository,
		protected readonly passwordEncoder: BCryptPasswordEncoder,
	) {
	}

	async execute(data: UpdatePasswordCommandData): Promise<UpdatePasswordCommandResult> {
		let user = await this.userRepository.findOneBy({ passwordResetToken: data.passwordResetToken });

		const validationResult = await this.validate(user, data);

		if (!!validationResult) {
			return plainToClass(UpdatePasswordCommandResult, { validationResult });
		}

		user.password = await this.passwordEncoder.encode(data.plainPassword);
		user.passwordResetToken = null;

		user = await this.userRepository.save(user);
		delete user.password;

		return plainToClass(UpdatePasswordCommandResult, { user });
	}

	async validate(user: User | undefined, data: UpdatePasswordCommandData): Promise<ValidationResult | undefined> {
		if (!user) {
			return ValidationResult.create({ errorMessage: `User not found` });
		}

		const result = await validate(data);

		if (result.length > 0) {
			return ValidationResult.create({ errorList: result });
		}

		return undefined;
	}

}
