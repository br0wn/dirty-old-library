import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { Format } from '../../../core/domain/taxonomy/model/format.entity';
import { FormatService } from '../../../core/domain/taxonomy/service/format.service';

@ApiTags('taxonomy-format')
@Crud({
	model: { type: Format }
})
@Controller('api/taxonomy/format')
export class FormatController {

	constructor(
		public readonly service: FormatService,
	) {
	}
}
