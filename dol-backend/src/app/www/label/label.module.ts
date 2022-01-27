import { Module } from '@nestjs/common';
import { CoreModule } from '../../../core/core.module';
import { LabelController } from './label.controller';


@Module({
	imports: [
		CoreModule,
	],
	providers: [],
	controllers: [
		LabelController,
	],
	exports: [],
})
export class LabelModule {
}
