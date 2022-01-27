import { UnprocessableEntityException } from '../../../lib/http/exception/http.exception';
import { ValidationResult } from '../../../lib/validator/validation.result';
import { Label } from '../../model/label';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

export const CREATE_LABEL = url('/api/label');

export interface CreateLabelRequest extends Partial<Label> {
}

export interface CreateLabelResponse extends Label {
}

export async function createLabel(data: CreateLabelRequest): Promise<CreateLabelResponse | ValidationResult> {
	let response;

	try {
		response = await jsonRequest(
			CREATE_LABEL,
			{
				method: 'post',
				body: JSON.stringify(data),
			},
		);
	} catch (e) {
		if (!(e instanceof UnprocessableEntityException)) {
			throw e;
		}

		return await e.response.json() as ValidationResult;
	}

	return await response.json() as CreateLabelResponse;
}
