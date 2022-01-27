import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { Style } from '../../../core/domain/taxonomy/model/style.entity';
import { StyleService } from '../../../core/domain/taxonomy/service/style.service';

@ApiTags('taxonomy-style')
@Crud({
	model: { type: Style },
})
@Controller('api/taxonomy/style')
export class StyleController {

	constructor(
		public readonly service: StyleService,
	) {
	}
}
