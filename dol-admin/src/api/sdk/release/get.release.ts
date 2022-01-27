import { Release } from '../../model/release';
import { jsonRequest } from '../../request/request';
import { url } from '../../routing/url';

const GET_RELEASE = url('/api/release/:id');

export interface GetReleaseResponse extends Release {
}

export async function getRelease(id: string): Promise<GetReleaseResponse> {
	const response = await jsonRequest(GET_RELEASE.replace(':id', id));
	return response.json();
}
