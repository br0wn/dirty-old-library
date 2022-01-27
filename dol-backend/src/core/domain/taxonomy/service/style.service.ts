import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Style } from '../model/style.entity';

export class StyleService extends TypeOrmCrudService<Style> {
	constructor(@InjectRepository(Style) repo) {
		super(repo);
	}
}
