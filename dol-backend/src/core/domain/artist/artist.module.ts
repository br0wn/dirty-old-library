import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaDataModule } from '../meta-data/meta.data.module';
import { TaxonomyModule } from '../taxonomy/taxonomy.module';
import { Artist } from './model/artist.entity';
import { ArtistRelation } from './model/artist.relation.entity';
import { ArtistRelationService } from './service/artist.relation.service';
import { ArtistService } from './service/artist.service';

const imports = [
	TypeOrmModule.forFeature([Artist, ArtistRelation]),
	TaxonomyModule,
	MetaDataModule,
];

const providers: Provider[] = [
	ArtistService,
	ArtistRelationService,
];

@Module({
	imports,
	providers,
	exports: providers,
})
export class ArtistModule {
}
