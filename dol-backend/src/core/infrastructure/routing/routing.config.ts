import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { normalizeBaseUrl } from '../../../lib/http/url';

@Injectable()
export class RoutingConfig {
	baseUrl: string;

	static create(data: Partial<RoutingConfig> = {}) {
		const object = plainToClass(RoutingConfig, data);
		object.baseUrl = normalizeBaseUrl(object.baseUrl);

		return object;
	}
}
