import React, { FunctionComponent, useCallback, useEffect, useMemo } from 'react';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Event } from '../../../../api/model/event';
import { updateEvent } from '../../../../api/sdk/event/update.event';
import { createFromException, createFromValidationResult } from '../../../../lib/final-form/submission.error';
import { RootState } from '../../../redux/module/_root';
import { loadEvent, selectById, updateSuccess } from '../../../redux/module/event';
import { createSelectLoader } from '../../../redux/module/loader';
import { EventForm } from './event.form';

export interface EventEditProps {
	id: string;
}

export const EventEdit: FunctionComponent<EventEditProps> = ({ id }) => {
	const selectLoader = useMemo(() => createSelectLoader(loadEvent.pending.type), []);
	const dispatch = useDispatch();

	const isLoading = useSelector(selectLoader);
	const event = useSelector((state: RootState) => selectById(state, id));

	const onSubmit = useCallback(async (values: Partial<Event>) => {
		let result;

		try {
			result = await updateEvent(id, values);
		} catch (e) {
			return createFromException(e.error || e);
		}

		if ('errorList' in result || 'errorMessage' in result) {
			return createFromValidationResult(result);
		}

		dispatch(updateSuccess(result as Event));

	}, [id, dispatch]);

	const initialValues = useMemo(() => ({
		...(event || {}),
	}), [event]);

	useEffect(() => {
		dispatch(loadEvent(id));
	}, [id, dispatch]);

	if (isLoading && !event) {
		return (<div>Loading</div>);
	}

	if (!event) {
		return (<div>Not Found</div>);
	}

	return (
		<Form
			onSubmit={onSubmit}
			initialValues={initialValues}
			keepDirtyOnReinitialize={false}
			component={EventForm}
		/>
	);
};
