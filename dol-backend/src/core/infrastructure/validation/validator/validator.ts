import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { ValidatorOptions } from 'class-validator/types/validation/ValidatorOptions';
import { ValidationResult } from '../../../../lib/validator/model/validation.result';


@Injectable()
export class Validator {

	private validatorOptions: ValidatorOptions = {
		whitelist: true,
		validationError: {
			target: false,
			value: false,
		},
	};

	async validate(object: object, validatorOptions?: ValidatorOptions): Promise<ValidationResult | undefined> {
		validatorOptions = { ...this.validatorOptions, ...(validatorOptions || {}) };

		const errorList = await validate(object, validatorOptions);

		if (errorList.length > 0) {
			return ValidationResult.createFromErrorList(errorList);
		}
	}

}
