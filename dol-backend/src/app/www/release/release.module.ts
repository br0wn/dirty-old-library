import { Module } from '@nestjs/common';
import { CoreModule } from '../../../core/core.module';
import { ReleaseController } from './release.controller';


@Module({
	imports: [
		CoreModule,
	],
	providers: [],
	controllers: [
		ReleaseController,
	],
	exports: [],
})
export class ReleaseModule {
}
