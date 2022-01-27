import { Injectable } from '@nestjs/common';
import { Environment } from 'nunjucks';

@Injectable()
export class NunjucksEngine {

	static TEMPLATE_EXTENSION = '.njk';

	constructor(
		private readonly engine: Environment,
	) {
	}

	async render(templatePath, contextData?: object): Promise<string> {
		templatePath = this.normalizeTemplatePath(templatePath);
		return this.engine.render(templatePath, contextData);
	}

	private normalizeTemplatePath(templatePath) {
		if (templatePath.slice('-4') !== NunjucksEngine.TEMPLATE_EXTENSION) {
			templatePath += NunjucksEngine.TEMPLATE_EXTENSION;
		}

		return templatePath;
	}
}
