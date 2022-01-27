import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { Track } from '../../../core/domain/track/model/track.entity';
import { TrackService } from '../../../core/domain/track/service/track.service';

@ApiTags('track')
@Crud({
	model: { type: Track },
	params: {
		id: {
			field: 'id',
			type: 'uuid',
			primary: true,
		},
	},
})
@Controller('api/track')
export class TrackController {

	constructor(
		public readonly service: TrackService,
	) {
	}
}
