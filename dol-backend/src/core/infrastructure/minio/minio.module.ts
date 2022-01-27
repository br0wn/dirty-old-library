import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestMinioModule } from 'nestjs-minio';
import { CONFIG_TOKEN } from '../../../config/minio';
import { ConfigModule } from '../config/config.module';

@Module({
	imports: [
		NestMinioModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => {
				return {
					endPoint: config.get(CONFIG_TOKEN).endPoint,
					port: config.get(CONFIG_TOKEN).port,
					useSSL: config.get(CONFIG_TOKEN).useSSL,
					accessKey: config.get(CONFIG_TOKEN).accessKey,
					secretKey: config.get(CONFIG_TOKEN).secretKey,
				};
			},
		}),
	],
})
export class MinioModule {
}
