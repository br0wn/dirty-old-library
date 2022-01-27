import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { ValidationError } from './validation.error';

export class ValidationResult {

	@ApiProperty({ type: [ValidationError] })
	errorList?: ValidationError[];

	@ApiProperty()
	errorMessage?: string;

	static create(data: Partial<ValidationResult> = {}) {
		return plainToClass(ValidationResult, data);
	}

	static createFromErrorList(errorList: ValidationResult['errorList']) {
		return ValidationResult.create({ errorList });
	}

	static createFromErrorMessage(errorMessage: ValidationResult['errorMessage']) {
		return ValidationResult.create({ errorMessage });
	}

	static createFromError(error: Error | any) {
		return ValidationResult.create({ errorMessage: error + '' });
	}
}
