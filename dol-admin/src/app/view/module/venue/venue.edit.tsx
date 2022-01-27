import React, { FunctionComponent, useCallback, useEffect, useMemo } from 'react';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Venue } from '../../../../api/model/venue';
import { updateVenue } from '../../../../api/sdk/venue/update.venue';
import { createFromException, createFromValidationResult } from '../../../../lib/final-form/submission.error';
import { RootState } from '../../../redux/module/_root';
import { createSelectLoader } from '../../../redux/module/loader';
import { loadVenue, selectById, updateSuccess } from '../../../redux/module/venue';
import { VenueForm } from './venue.form';

export interface VenueEditProps {
	id: string;
}

export const VenueEdit: FunctionComponent<VenueEditProps> = ({ id }) => {
	const selectLoader = useMemo(() => createSelectLoader(loadVenue.pending.type), []);
	const dispatch = useDispatch();

	const isLoading = useSelector(selectLoader);
	const venue = useSelector((state: RootState) => selectById(state, id));

	const onSubmit = useCallback(async (values: Partial<Venue>) => {
		let result;

		try {
			result = await updateVenue(id, values);
		} catch (e) {
			return createFromException(e.error || e);
		}

		if ('errorList' in result || 'errorMessage' in result) {
			return createFromValidationResult(result);
		}

		dispatch(updateSuccess(result as Venue));

	}, [id, dispatch]);

	const initialValues = useMemo(() => ({
		...(venue || {}),
	}), [venue]);

	useEffect(() => {
		dispatch(loadVenue(id));
	}, [id, dispatch]);

	if (isLoading && !venue) {
		return (<div>Loading</div>);
	}

	if (!venue) {
		return (<div>Not Found</div>);
	}

	return (
		<Form
			onSubmit={onSubmit}
			initialValues={initialValues}
			keepDirtyOnReinitialize={false}
			component={VenueForm}
		/>
	);
};
