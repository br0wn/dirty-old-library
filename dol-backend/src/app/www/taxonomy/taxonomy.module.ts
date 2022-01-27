import { Module } from '@nestjs/common';
import { CoreModule } from '../../../core/core.module';
import { FormatController } from './format.controller';
import { GenreController } from './genre.controller';
import { StyleController } from './style.controller';


@Module({
	imports: [
		CoreModule,
	],
	providers: [],
	controllers: [
		GenreController,
		FormatController,
		StyleController,
	],
	exports: [],
})
export class TaxonomyModule {
}
