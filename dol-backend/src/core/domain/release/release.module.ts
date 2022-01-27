import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistModule } from '../artist/artist.module';
import { MetaDataModule } from '../meta-data/meta.data.module';
import { TaxonomyModule } from '../taxonomy/taxonomy.module';
import { CreateReleaseCommand } from './command/create.release.command';
import { UpdateReleaseCommand } from './command/update.release.command';
import { ReleaseArtist } from './model/release.artist.entity';
import { Release } from './model/release.entity';
import { ReleaseLabel } from './model/release.label.entity';
import { ReleaseMaster } from './model/release.master.entity';
import { GetReleaseListQuery } from './query/get.release.list.query';
import { ReleaseEntityRepository } from './repository/release.repository';

const imports = [
	TypeOrmModule.forFeature([Release, ReleaseMaster, ReleaseLabel, ReleaseArtist]),
	MetaDataModule,
	TaxonomyModule,
	ArtistModule,
];

const providers: Provider[] = [
	ReleaseEntityRepository,
	GetReleaseListQuery,
	CreateReleaseCommand,
	UpdateReleaseCommand,
];

@Module({
	imports,
	providers,
	exports: providers,
})
export class ReleaseModule {
}
