import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistModule } from '../artist/artist.module';
import { ReleaseModule } from '../release/release.module';
import { TrackArtist } from './model/track.artist.entity';
import { TrackCredit } from './model/track.credit.entity';
import { Track } from './model/track.entity';
import { TrackArtistService } from './service/track.artist.service';
import { TrackCreditService } from './service/track.credit.service';
import { TrackService } from './service/track.service';

const imports = [
	TypeOrmModule.forFeature([Track, TrackCredit, TrackArtist]),
	ArtistModule,
	ReleaseModule,
];

const providers: Provider[] = [
	TrackService,
	TrackArtistService,
	TrackCreditService,
];

@Module({
	imports,
	providers,
	exports: providers,
})
export class TrackModule {
}
