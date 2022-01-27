import React, { FunctionComponent, useCallback } from 'react';
import { Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Event } from '../../../../api/model/event';
import { createEvent } from '../../../../api/sdk/event/create.event';
import { createFromException, createFromValidationResult } from '../../../../lib/final-form/submission.error';
import { ValidationResult } from '../../../../lib/validator/validation.result';
import { updateSuccess } from '../../../redux/module/event';
import { EVENT_EDIT } from '../../../routing/route';
import { EventForm } from './event.form';

export interface EventCreateProps {
}

export const EventCreate: FunctionComponent<EventCreateProps> = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const onSubmit = useCallback(async (values: Partial<Event>) => {
		let result: Event | ValidationResult;

		try {
			result = await createEvent(values);
		} catch (e) {
			return createFromException(e.error || e);
		}

		if ('errorList' in result || 'errorMessage' in result) {
			return createFromValidationResult(result);
		}

		dispatch(updateSuccess(result as Event));

		setTimeout(function () {
			history.push(EVENT_EDIT.replace(':id', (result as Event).id!));
		}, 1000);
	}, [dispatch, history]);

	return (
		<Form
			onSubmit={onSubmit}
			render={props => (
				<EventForm
					{...props}
					submitSuccessMessage={
						EventForm.defaultProps?.submitSuccessMessage + ' You will be redirected to Edit page in a second.'
					}
				/>
			)}
		/>
	);
};
