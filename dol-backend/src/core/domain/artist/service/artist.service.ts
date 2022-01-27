import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Artist } from '../model/artist.entity';

export class ArtistService extends TypeOrmCrudService<Artist> {
	constructor(@InjectRepository(Artist) repo) {
		super(repo);
	}
}
