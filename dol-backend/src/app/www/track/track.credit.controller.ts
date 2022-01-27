import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { TrackCredit } from '../../../core/domain/track/model/track.credit.entity';
import { TrackCreditService } from '../../../core/domain/track/service/track.credit.service';

@ApiTags('track-credit')
@Crud({ model: { type: TrackCredit } })
@Controller('api/track-credit')
export class TrackCreditController {

	constructor(
		public readonly service: TrackCreditService,
	) {
	}
}
