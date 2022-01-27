import { Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONFIG_TOKEN } from '../../../config/http';
import { ConfigModule } from '../config/config.module';
import { RoutingConfig } from './routing.config';
import { UrlGenerator } from './url-generator/url.generator';

const providers: Provider[] = [
	{
		provide: RoutingConfig,
		inject: [ConfigService],
		useFactory: (configService: ConfigService) => {
			const config = configService.get(CONFIG_TOKEN).routing;
			return RoutingConfig.create(config);
		},
	},
	UrlGenerator,
];

@Module({
	imports: [ConfigModule],
	providers,
	exports: providers,
})
export class RoutingModule {

}
