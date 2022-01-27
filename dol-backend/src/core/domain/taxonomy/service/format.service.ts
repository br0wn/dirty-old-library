import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Format } from '../model/format.entity';

export class FormatService extends TypeOrmCrudService<Format> {
	constructor(@InjectRepository(Format) repo) {
		super(repo);
	}
}
