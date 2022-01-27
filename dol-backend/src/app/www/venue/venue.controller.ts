import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { Venue } from '../../../core/domain/venue/model/venue.entity';
import { VenueService } from '../../../core/domain/venue/service/venue.service';

@ApiTags('venue')
@Crud({
	model: { type: Venue },
	params: {
		id: {
			field: 'id',
			type: 'uuid',
			primary: true,
		},
	},
})
@Controller('api/venue')
export class VenueController {

	constructor(
		public readonly service: VenueService,
	) {
	}
}
