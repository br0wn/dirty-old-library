import React, { FunctionComponent, useCallback } from 'react';
import { Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Venue } from '../../../../api/model/venue';
import { createVenue } from '../../../../api/sdk/venue/create.venue';
import { createFromException, createFromValidationResult } from '../../../../lib/final-form/submission.error';
import { ValidationResult } from '../../../../lib/validator/validation.result';
import { updateSuccess } from '../../../redux/module/venue';
import { VENUE_EDIT } from '../../../routing/route';
import { VenueForm } from './venue.form';

export interface VenueCreateProps {
}

export const VenueCreate: FunctionComponent<VenueCreateProps> = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const onSubmit = useCallback(async (values: Partial<Venue>) => {
		let result: Venue | ValidationResult;

		try {
			result = await createVenue(values);
		} catch (e) {
			return createFromException(e.error || e);
		}

		if ('errorList' in result || 'errorMessage' in result) {
			return createFromValidationResult(result);
		}

		dispatch(updateSuccess(result as Venue));

		setTimeout(function () {
			history.push(VENUE_EDIT.replace(':id', (result as Venue).id!));
		}, 1000);
	}, [dispatch, history]);

	return (
		<Form
			onSubmit={onSubmit}
			render={props => (
				<VenueForm
					{...props}
					submitSuccessMessage={
						VenueForm.defaultProps?.submitSuccessMessage + ' You will be redirected to Edit page in a second.'
					}
				/>
			)}
		/>
	);
};
