import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { EventService } from '../../../core/domain/event/service/event.service';
import { Event } from '../../../core/domain/event/model/event.entity';

@ApiTags('event')
@Crud({
	model: { type: Event },
	params: {
		id: {
			field: 'id',
			type: 'uuid',
			primary: true,
		},
	}
})
@Controller('api/event')
export class EventController {

	constructor(
		public readonly service: EventService,
	) {
	}
}
