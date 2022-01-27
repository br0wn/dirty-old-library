import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import { CliModule } from './app/cli/cli.module';

async function bootstrap() {
	const app = await NestFactory.createApplicationContext(CliModule);
	return app.select(CommandModule).get(CommandService).exec();
}

// tslint:disable-next-line:no-console
bootstrap().catch(console.error);
