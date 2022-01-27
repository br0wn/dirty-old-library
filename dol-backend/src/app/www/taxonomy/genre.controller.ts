import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { Genre } from '../../../core/domain/taxonomy/model/genre.entity';
import { GenreService } from '../../../core/domain/taxonomy/service/genre.service';

@ApiTags('taxonomy-genre')
@Crud({
	model: { type: Genre }
})
@Controller('api/taxonomy/genre')
export class GenreController {

	constructor(
		public readonly service: GenreService,
	) {
	}
}
