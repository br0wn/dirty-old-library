import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Format } from './model/format.entity';
import { Genre } from './model/genre.entity';
import { Style } from './model/style.entity';
import { FormatService } from './service/format.service';
import { GenreService } from './service/genre.service';
import { StyleService } from './service/style.service';

const imports = [
	TypeOrmModule.forFeature([Genre, Format, Style]),
];

const providers: Provider[] = [
	GenreService,
	FormatService,
	StyleService,
];

@Module({
	imports,
	providers,
	exports: providers,
})
export class TaxonomyModule {
}
