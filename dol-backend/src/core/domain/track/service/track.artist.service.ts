import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { TrackArtist } from '../model/track.artist.entity';

export class TrackArtistService extends TypeOrmCrudService<TrackArtist> {
	constructor(@InjectRepository(TrackArtist) repo) {
		super(repo);
	}
}
