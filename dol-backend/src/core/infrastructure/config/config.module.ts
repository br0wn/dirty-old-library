import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import debug from '../../../config/debug';
import http from '../../../config/http';
import minio from '../../../config/minio';
import nodemailer from '../../../config/nodemailer';
import security from '../../../config/security';

const configuration = [
	http,
	debug,
	security,
	nodemailer,
	minio,
];

const modules = [
	NestConfigModule.forRoot({
		load: configuration,
		envFilePath: ['.env.local', '.env'],
		validationOptions: {
			allowUnknown: true,
		},
		validationSchema: Joi.object({
			ROUTER_BASE_URL: Joi.string().required(),
			TYPEORM_USERNAME: Joi.string().required(),
			TYPEORM_PASSWORD: Joi.string().required(),
			TYPEORM_DATABASE: Joi.string().required(),
			AUTH_UPDATE_PASSWORD_URL: Joi.string().required(),
			AUTH_CONFIRM_EMAIL_URL: Joi.string().required(),
			AUTH_RESET_PASSWORD_EMAIL_FROM: Joi.string().required(),
			MINIO_ENDPOINT: Joi.string().required(),
			MINIO_PORT: Joi.number().required(),
			MINIO_USE_SSL: Joi.string().required(),
			MINIO_ACCESS_KEY: Joi.string().required(),
			MINIO_SECRET_KEY: Joi.string().required(),
		}),
	}),
];

@Module({
	imports: modules,
	exports: modules,
})
export class ConfigModule {
}
