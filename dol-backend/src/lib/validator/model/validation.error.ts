import { ApiProperty } from '@nestjs/swagger';
import { ValidationError as ClassValidatorValidationError } from 'class-validator';

export class ValidationError extends ClassValidatorValidationError {
	@ApiProperty()
	property: string;

	@ApiProperty()
	constraints?: { [p: string]: string };

	@ApiProperty({ type: () => [ValidationError] })
	children?: ValidationError[];

	@ApiProperty()
	contexts?: { [p: string]: any };
}
