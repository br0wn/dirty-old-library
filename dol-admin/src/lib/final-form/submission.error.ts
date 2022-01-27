import { FORM_ERROR, SubmissionErrors } from 'final-form';
import { ValidationError, ValidationResult } from '../validator/validation.result';

export function createFromValidationResult(result: ValidationResult): SubmissionErrors {
	const errors: SubmissionErrors = {};

	for (const violation of result.errorList) {
		errors[violation.property] = createFromValidationError(violation);
	}

	if (!!result.errorMessage) {
		errors[FORM_ERROR] = result.errorMessage;
	}

	return errors;
}

export function createFromException(error: Error) {
	return {
		[FORM_ERROR]: error.message || (error + ''),
	} as SubmissionErrors;
}

export function createFromValidationError(violation: ValidationError): string | SubmissionErrors {
	// if there are no children, return combined error messages
	if (!violation.children || violation.children.length <= 0) {
		return Object.values(violation.constraints || {}).join(', \n');
	}

	// otherwise build a submissions error object
	const errors: SubmissionErrors = {};

	for (const childViolation of violation.children) {
		errors[childViolation.property] = createFromValidationError(childViolation);
	}

	return errors;
}

export function createFromObject(object: object) {
	return object as SubmissionErrors;
}
