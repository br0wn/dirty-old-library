export interface ValidationError {
	property: string;
	constraints?: { [p: string]: string };
	children?: ValidationError[];
	contexts?: { [p: string]: any };
}

export interface ValidationResult {
	errorList: ValidationError[];
	errorMessage: string;
}
