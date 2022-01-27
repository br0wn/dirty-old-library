import { Module, Provider } from '@nestjs/common';

const imports = [
	// TypeOrmModule.forFeature([Artist, ArtistRelation]),
];

const providers: Provider[] = [];

@Module({
	imports,
	providers,
	exports: providers,
})
export class MetaDataModule {
}
