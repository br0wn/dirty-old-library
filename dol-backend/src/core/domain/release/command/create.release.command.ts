import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ValidationResult } from '../../../../lib/validator/model/validation.result';
import { Validator } from '../../../infrastructure/validation/validator/validator';
import { ReleaseArtistType } from '../model/release.artist.entity';
import { Release } from '../model/release.entity';
import { ReleaseEntityRepository } from '../repository/release.repository';

export class CreateReleaseCommandData extends Release {
}

export class CreateReleaseCommandResult {
	release?: Release;
	validationResult?: ValidationResult;
}

@Injectable()
export class CreateReleaseCommand {

	constructor(
		private readonly validator: Validator,
		private readonly releaseRepository: ReleaseEntityRepository,
	) {
	}

	async execute(data: CreateReleaseCommandData): Promise<CreateReleaseCommandResult> {
		const validationResult = await this.validator.validate(data);

		if (!!validationResult) {
			return plainToClass(CreateReleaseCommandResult, { validationResult });
		}

		if (!!data.artistList) {
			for (let i = 0; i < data.artistList.length; i++) {
				data.artistList[i].artistType = i === 0 ? ReleaseArtistType.MAIN : ReleaseArtistType.FEATURED;
				data.artistList[i].order = i;
			}
		}
		if (!!data.labelList) {
			for (let i = 0; i < data.labelList.length; i++) {
				data.labelList[i].order = i;
			}
		}

		const release = await this.releaseRepository.save(data);

		return plainToClass(CreateReleaseCommandResult, { release });
	}

}
