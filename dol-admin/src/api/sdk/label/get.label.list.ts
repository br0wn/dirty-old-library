import { Label } from '../../model/label';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

const GET_LABEL_LIST = url('/api/label');

export interface GetLabelListRequest {
}

export interface GetLabelListResponse {
	data: Label[];
	count: number,
	total: number,
	page: number,
	pageCount: number
}

export async function getLabelList(data: GetLabelListRequest): Promise<GetLabelListResponse> {
	const response = await jsonRequest(GET_LABEL_LIST);
	return response.json();
}
