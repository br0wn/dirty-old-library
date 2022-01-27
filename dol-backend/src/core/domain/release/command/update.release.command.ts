import { Injectable } from '@nestjs/common';
import { plainToClass, plainToClassFromExist } from 'class-transformer';
import { ValidationResult } from '../../../../lib/validator/model/validation.result';
import { Validator } from '../../../infrastructure/validation/validator/validator';
import { ReleaseArtistType } from '../model/release.artist.entity';
import { Release } from '../model/release.entity';
import { ReleaseEntityRepository } from '../repository/release.repository';

export class UpdateReleaseCommandData extends Release {
}

export class UpdateReleaseCommandResult {
	release?: Release;
	isNotFound?: boolean;
	f;
	validationResult?: ValidationResult;
}

@Injectable()
export class UpdateReleaseCommand {

	constructor(
		private readonly validator: Validator,
		private readonly releaseRepository: ReleaseEntityRepository,
	) {
	}

	async execute(id: string, data: UpdateReleaseCommandData): Promise<UpdateReleaseCommandResult> {
		const validationResult = await this.validator.validate(data);

		if (!!validationResult) {
			return plainToClass(UpdateReleaseCommandResult, { validationResult });
		}

		const oldRelease = await this.releaseRepository.findOneBy({ id });

		if (!oldRelease) {
			return plainToClass(UpdateReleaseCommandResult, { isNotFound: true });
		}

		if (!!data.artistList) {
			for (let i = 0; i < data.artistList.length; i++) {
				data.artistList[i].artistType = i === 0 ? ReleaseArtistType.MAIN : ReleaseArtistType.FEATURED;
				data.artistList[i].order = i;
				data.artistList[i].releaseId = oldRelease.id;
			}
		}
		if (!!data.labelList) {
			for (let i = 0; i < data.labelList.length; i++) {
				data.labelList[i].order = i;
				data.labelList[i].releaseId = oldRelease.id;
			}
		}

		let updatedRelease = plainToClassFromExist(oldRelease, data);
		updatedRelease = await this.releaseRepository.save(updatedRelease);

		return plainToClass(UpdateReleaseCommandResult, { release: updatedRelease });
	}

}
