import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Label } from '../model/label.entity';

export class LabelService extends TypeOrmCrudService<Label> {
	constructor(@InjectRepository(Label) repo) {
		super(repo);
	}
}
