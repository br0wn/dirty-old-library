import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { Artist } from '../../../core/domain/artist/model/artist.entity';
import { ArtistService } from '../../../core/domain/artist/service/artist.service';

@ApiTags('artist')
@Crud({
	model: { type: Artist },
	params: {
		id: {
			field: 'id',
			type: 'uuid',
			primary: true,
		},
	},
})
@Controller('api/artist')
export class ArtistController {

	constructor(
		public readonly service: ArtistService,
	) {
	}
}
