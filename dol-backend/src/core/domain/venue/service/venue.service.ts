import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Venue } from '../model/venue.entity';

export class VenueService extends TypeOrmCrudService<Venue> {
	constructor(@InjectRepository(Venue) repo) {
		super(repo);
	}
}
