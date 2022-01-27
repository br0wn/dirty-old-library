import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { createTransport } from 'nodemailer';
import { CONFIG_TOKEN } from '../../../config/nodemailer';
import { ConfigModule } from '../config/config.module';

const providers = [
	{
		provide: 'mailer',
		inject: [ConfigService],
		useFactory: (configService: ConfigService) => {
			const config = configService.get(CONFIG_TOKEN);
			return createTransport(config);
		},
	},
];

@Module({
	imports: [ConfigModule],
	providers,
	exports: providers,
})
export class NodemailerModule {
}
