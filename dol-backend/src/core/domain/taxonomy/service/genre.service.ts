import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Genre } from '../model/genre.entity';

export class GenreService extends TypeOrmCrudService<Genre> {
	constructor(@InjectRepository(Genre) repo) {
		super(repo);
	}
}
