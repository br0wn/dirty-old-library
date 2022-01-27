import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as debug from 'debug';
import { Debugger } from 'debug';
import { CONFIG_TOKEN } from '../../../config/debug';
import { ConfigModule } from '../config/config.module';

const providers = [
	{
		provide: 'debug',
		inject: [ConfigService],
		useFactory: (configService: ConfigService): Debugger => {
			const config = configService.get(CONFIG_TOKEN);
			return debug(config.prefix);
		},
	},
];

@Module({
	imports: [ConfigModule],
	providers,
	exports: providers,
})
export class DebugModule {
}
