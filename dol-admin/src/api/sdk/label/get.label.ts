import { Label } from '../../model/label';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

const GET_LABEL = url('/api/label/:id');

export interface GetLabelResponse extends Label {
}

export async function getLabel(id: string): Promise<GetLabelResponse> {
	const response = await jsonRequest(GET_LABEL.replace(':id', id));
	return response.json();
}
