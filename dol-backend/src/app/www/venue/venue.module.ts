import { Module } from '@nestjs/common';
import { CoreModule } from '../../../core/core.module';
import { VenueController } from './venue.controller';


@Module({
	imports: [
		CoreModule,
	],
	providers: [],
	controllers: [
		VenueController,
	],
	exports: [],
})
export class VenueModule {
}
