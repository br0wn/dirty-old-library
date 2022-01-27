import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Track } from '../model/track.entity';

export class TrackService extends TypeOrmCrudService<Track> {
	constructor(@InjectRepository(Track) repo) {
		super(repo);
	}
}
