import { Module } from '@nestjs/common';
import { CoreModule } from '../../../core/core.module';
import { TrackArtistController } from './track.artist.controller';
import { TrackController } from './track.controller';
import { TrackCreditController } from './track.credit.controller';


@Module({
	imports: [
		CoreModule,
	],
	providers: [],
	controllers: [
		TrackController,
		TrackArtistController,
		TrackCreditController,
	],
	exports: [],
})
export class TrackModule {
}
