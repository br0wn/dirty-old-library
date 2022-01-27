import { Injectable } from '@nestjs/common';
import * as qs from 'querystring';
import { normalizeUri } from '../../../../lib/http/url';
import { RoutingConfig } from '../routing.config';

@Injectable()
export class UrlGenerator {

	constructor(
		private readonly config: RoutingConfig,
	) {
	}

	get baseUrl() {
		return this.config.baseUrl;
	}

	async generate(uri = '', parameters: object = {}, queryParams?: any) {
		uri = normalizeUri(uri);
		uri = this.replaceParameters(uri, parameters);

		if (!!queryParams) {
			uri += '?' + qs.stringify(queryParams);
		}

		return this.config.baseUrl + uri;
	}

	replaceParameters(uri: string, parameters: object) {
		for (const key of Object.keys(parameters)) {
			const parameterPlaceholder = `:${key}`;
			const parameterValue = parameters[key];

			uri = uri.replace(parameterPlaceholder, parameterValue);
		}

		return uri;
	}

}
