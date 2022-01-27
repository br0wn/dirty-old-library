import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as appRoot from 'app-root-path';
import { plainToClass } from 'class-transformer';
import { Environment, FileSystemLoader } from 'nunjucks';
import { join } from 'path';
import { NunjucksEngine } from './engine/nunjucks.engine';
import { TemplateEngineConfig } from './engine/template.engine.config';

const providers: Provider[] = [
	{
		provide: TemplateEngineConfig,
		useFactory: () => {
			return plainToClass(TemplateEngineConfig, {
				templatesDir: join(appRoot.toString(), 'template'),
			});
		},
	},
	{
		provide: Environment,
		inject: [TemplateEngineConfig],
		useFactory: (config: TemplateEngineConfig) => {
			const loader = new FileSystemLoader(config.templatesDir, {});
			const env = new Environment(loader);
			env.addFilter('date', require('nunjucks-date'));
			return env;
		},
	},
	NunjucksEngine,
];

@Module({
	imports: [ConfigModule],
	providers,
	exports: providers,
})
export class TemplateModule {
}
