import React, { FunctionComponent, useCallback } from 'react';
import { Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Track } from '../../../../api/model/track';
import { createTrack } from '../../../../api/sdk/track/create.track';
import { createFromException, createFromValidationResult } from '../../../../lib/final-form/submission.error';
import { ValidationResult } from '../../../../lib/validator/validation.result';
import { updateSuccess } from '../../../redux/module/track';
import { TRACK_EDIT } from '../../../routing/route';
import { TrackForm } from './track.form';

export interface TrackCreateProps {
}

export const TrackCreate: FunctionComponent<TrackCreateProps> = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const onSubmit = useCallback(async (values: Partial<Track>) => {
		let result: Track | ValidationResult;

		try {
			result = await createTrack(values);
		} catch (e) {
			return createFromException(e.error || e);
		}

		if ('errorList' in result || 'errorMessage' in result) {
			return createFromValidationResult(result);
		}

		dispatch(updateSuccess(result as Track));

		setTimeout(function () {
			history.push(TRACK_EDIT.replace(':id', (result as Track).id!));
		}, 1000);
	}, [dispatch, history]);

	return (
		<Form
			onSubmit={onSubmit}
			render={props => (
				<TrackForm
					{...props}
					submitSuccessMessage={
						TrackForm.defaultProps?.submitSuccessMessage + ' You will be redirected to Edit page in a second.'
					}
				/>
			)}
		/>
	);
};
