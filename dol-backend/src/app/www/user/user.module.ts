import { Module } from '@nestjs/common';
import { CoreModule } from '../../../core/core.module';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';

@Module({
	imports: [
		CoreModule,
		AuthModule,
	],
	providers: [],
	controllers: [
		UserController,
	],
	exports: [],
})
export class UserModule {
}
