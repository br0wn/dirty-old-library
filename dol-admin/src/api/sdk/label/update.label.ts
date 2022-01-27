import { UnprocessableEntityException } from '../../../lib/http/exception/http.exception';
import { ValidationResult } from '../../../lib/validator/validation.result';
import { Label } from '../../model/label';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

export const UPDATE_LABEL = url('/api/label/:id');

export interface UpdateLabelRequest extends Partial<Label> {

}

export interface UpdateLabelResponse extends Label {
}

export async function updateLabel(id: string, data: UpdateLabelRequest): Promise<UpdateLabelResponse | ValidationResult> {
	let response;

	try {
		response = await jsonRequest(
			UPDATE_LABEL.replace(':id', id),
			{
				method: 'PATCH',
				body: JSON.stringify(data),
			},
		);
	} catch (e) {
		if (!(e instanceof UnprocessableEntityException)) {
			throw e;
		}

		return await e.response.json() as ValidationResult;
	}

	return await response.json() as UpdateLabelResponse;
}
