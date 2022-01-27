import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { LabelService } from '../../../core/domain/label/service/label.service';
import { Label } from '../../../core/domain/label/model/label.entity';

@ApiTags('label')
@Crud({
	model: { type: Label },
	params: {
		id: {
			field: 'id',
			type: 'uuid',
			primary: true,
		},
	}
})
@Controller('api/label')
export class LabelController {

	constructor(
		public readonly service: LabelService,
	) {
	}
}
