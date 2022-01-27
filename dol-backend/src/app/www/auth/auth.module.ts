import { Module } from '@nestjs/common';
import { CoreModule } from '../../../core/core.module';
import { AuthController } from './auth.controller';

const providers = [];

@Module({
	imports: [
		CoreModule,
	],
	providers,
	controllers: [
		AuthController,
	],
	exports: providers,
})
export class AuthModule {
}
