import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { TrackCredit } from '../model/track.credit.entity';

export class TrackCreditService extends TypeOrmCrudService<TrackCredit> {
	constructor(@InjectRepository(TrackCredit) repo) {
		super(repo);
	}
}
