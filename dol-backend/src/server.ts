import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { json } from 'express';
import { WwwModule } from './app/www/www.module';
import { CONFIG_TOKEN } from './config/http';
import { parseBoolean } from './lib/config/parse.env';

async function bootstrap() {
	/*
	 * App creation
	 */
	const server = express();

	const app = await NestFactory.create<NestExpressApplication>(
		WwwModule,
		new ExpressAdapter(server),
	);

	const options = app.get(ConfigService).get(CONFIG_TOKEN);

	/*
	 * Http setup
	 */
	app.enableCors(options.cors);
	app.use(json({ limit: '50mb' }));
	app.set('trust proxy', options.server.trustProxy);

	/*
	 * Swagger setup
	 */
	const swaggerOptions = new DocumentBuilder()
		.setTitle('CountMe Cloud')
		.setDescription('The CountMe Cloud API description')
		.setVersion('1.0')
		.addBearerAuth({
			type: 'http',
			scheme: 'bearer',
			bearerFormat: 'JWT',
		})
		.build();

	const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);

	SwaggerModule.setup('api/doc', app, swaggerDocument, {
		swaggerOptions: {
			persistAuthorization: parseBoolean(process.env.SWAGGER_PERSIST_AUTHORIZATION, false),
		},
	});

	/*
	 * App init
	 */
	await app.listen(options.server.port);
}

// tslint:disable-next-line:no-console
bootstrap().catch(console.error);
