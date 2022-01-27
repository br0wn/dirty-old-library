import { Module } from '@nestjs/common';
import { CoreModule } from '../../../core/core.module';
import { ArtistController } from './artist.controller';
import { ArtistRelationController } from './artist.relation.controller';


@Module({
	imports: [
		CoreModule,
	],
	providers: [],
	controllers: [
		ArtistController,
		ArtistRelationController,
	],
	exports: [],
})
export class ArtistModule {
}
