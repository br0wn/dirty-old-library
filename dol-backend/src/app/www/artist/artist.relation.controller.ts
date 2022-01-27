import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { ArtistRelation } from '../../../core/domain/artist/model/artist.relation.entity';
import { ArtistRelationService } from '../../../core/domain/artist/service/artist.relation.service';

@ApiTags('artist-relation')
@Crud({ model: { type: ArtistRelation } })
@Controller('api/artist-relation')
export class ArtistRelationController {

	constructor(
		public readonly service: ArtistRelationService,
	) {
	}
}
