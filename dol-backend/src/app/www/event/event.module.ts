import { Module } from '@nestjs/common';
import { CoreModule } from '../../../core/core.module';
import { EventController } from './event.controller';


@Module({
	imports: [
		CoreModule,
	],
	providers: [],
	controllers: [
		EventController,
	],
	exports: [],
})
export class EventModule {
}
