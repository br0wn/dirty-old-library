import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, validate } from 'class-validator';
import * as cryptoRandomString from 'crypto-random-string';
import * as Mail from 'nodemailer/lib/mailer';
import { ValidationResult } from '../../../../lib/validator/model/validation.result';
import { User } from '../model/user.entity';
import { UserEntityRepository } from '../repository/user.entity.repository';

export class ResetPasswordCommandData {
	@IsString()
	@IsEmail()
	@IsNotEmpty()
	email: string;
}

export class ResetPasswordCommandConfig {
	updatePasswordUrl: string;
	resetPasswordEmailFrom: string;
	resetPasswordEmailSubject: string;
}

export class ResetPasswordCommandResult {
	validationResult?: ValidationResult;
}

@Injectable()
export class ResetPasswordCommand {
	constructor(
		private readonly userRepository: UserEntityRepository,
		@Inject('mailer') private readonly mailer: Mail,
		private readonly config: ResetPasswordCommandConfig,
	) {
	}

	async execute(data: ResetPasswordCommandData): Promise<ResetPasswordCommandResult> {
		const validationResult = await this.validate(data);

		if (!!validationResult) {
			return plainToClass(ResetPasswordCommandResult, { validationResult });
		}

		let user = await this.userRepository.findOneBy({ email: data.email });

		if (!user) {
			return plainToClass(ResetPasswordCommandResult, {});
		}

		user.passwordResetToken = await this.createPasswordResetToken();
		user = await this.userRepository.save(user);

		await this.sendResetPasswordEmail(user);

		return plainToClass(ResetPasswordCommandResult, {});
	}

	async createPasswordResetToken(): Promise<string> {
		return cryptoRandomString({ length: 32, type: 'url-safe' });
	}

	async sendResetPasswordEmail(user: User): Promise<void> {
		const url = this.config.updatePasswordUrl.replace(':token', user.passwordResetToken);

		const html = `
<div>
		<h1>Password reset e-mail:</h1>
    <p>Please click on the link below to reset your password:</p>
    <a href="${url}">${url}</a>
</div>
`;

		try {
			await this.mailer.sendMail({
				from: this.config.resetPasswordEmailFrom,
				to: user.email,
				subject: this.config.resetPasswordEmailSubject,
				html,
			});
		} catch (e) {
			// tslint:disable-next-line:no-console
			console.error(e);
		}
	}

	async validate(data: ResetPasswordCommandData): Promise<ValidationResult | undefined> {
		const result = await validate(data);

		if (result.length > 0) {
			return ValidationResult.create({ errorList: result });
		}

		return undefined;
	}
}
