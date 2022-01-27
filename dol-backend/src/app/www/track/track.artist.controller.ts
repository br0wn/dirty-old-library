import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { TrackArtist } from '../../../core/domain/track/model/track.artist.entity';
import { TrackArtistService } from '../../../core/domain/track/service/track.artist.service';

@ApiTags('track-artist')
@Crud({ model: { type: TrackArtist } })
@Controller('api/track-artist')
export class TrackArtistController {

	constructor(
		public readonly service: TrackArtistService,
	) {
	}
}
