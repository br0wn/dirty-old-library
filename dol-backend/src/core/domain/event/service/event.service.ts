import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Event } from '../model/event.entity';

export class EventService extends TypeOrmCrudService<Event> {
	constructor(@InjectRepository(Event) repo) {
		super(repo);
	}
}
