import React, { FunctionComponent, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Artist } from '../../../../api/model/artist';
import { createArtist } from '../../../../api/sdk/artist/create.artist';
import { createFromException, createFromValidationResult } from '../../../../lib/final-form/submission.error';
import { ValidationResult } from '../../../../lib/validator/validation.result';
import { updateSuccess } from '../../../redux/module/artist';
import { ARTIST_LIST } from '../../../routing/route';
import { ArtistForm } from './artist.form';

export interface ArtistCreateProps {
}

export const ArtistCreate: FunctionComponent<ArtistCreateProps> = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const onSubmit = useCallback(async (values: Partial<Artist>) => {
		let result: Artist | ValidationResult;

		try {
			result = await createArtist(values);
		} catch (e) {
			return createFromException(e.error || e);
		}

		if ('errorList' in result || 'errorMessage' in result) {
			return createFromValidationResult(result);
		}

		dispatch(updateSuccess(result as Artist));

		setTimeout(function () {
			history.push(ARTIST_LIST);
		}, 1000);
	}, [history, dispatch]);

	return (
		<ArtistForm
			onSubmit={onSubmit}
		/>
	);
};
