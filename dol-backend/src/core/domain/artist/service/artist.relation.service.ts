import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ArtistRelation } from '../model/artist.relation.entity';

export class ArtistRelationService extends TypeOrmCrudService<ArtistRelation> {
	constructor(@InjectRepository(ArtistRelation) repo) {
		super(repo);
	}
}
