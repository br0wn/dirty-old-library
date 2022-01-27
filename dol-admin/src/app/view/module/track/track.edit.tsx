import React, { FunctionComponent, useCallback, useEffect, useMemo } from 'react';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Track } from '../../../../api/model/track';
import { updateTrack } from '../../../../api/sdk/track/update.track';
import { createFromException, createFromValidationResult } from '../../../../lib/final-form/submission.error';
import { RootState } from '../../../redux/module/_root';
import { createSelectLoader } from '../../../redux/module/loader';
import { loadTrack, selectById, updateSuccess } from '../../../redux/module/track';
import { TrackForm } from './track.form';

export interface TrackEditProps {
	id: string;
}

export const TrackEdit: FunctionComponent<TrackEditProps> = ({ id }) => {
	const selectLoader = useMemo(() => createSelectLoader(loadTrack.pending.type), []);
	const dispatch = useDispatch();

	const isLoading = useSelector(selectLoader);
	const track = useSelector((state: RootState) => selectById(state, id));

	const onSubmit = useCallback(async (values: Partial<Track>) => {
		let result;

		try {
			result = await updateTrack(id, values);
		} catch (e) {
			return createFromException(e.error || e);
		}

		if ('errorList' in result || 'errorMessage' in result) {
			return createFromValidationResult(result);
		}

		dispatch(updateSuccess(result as Track));

	}, [id, dispatch]);

	const initialValues = useMemo(() => ({
		...(track || {}),
	}), [track]);

	useEffect(() => {
		dispatch(loadTrack(id));
	}, [id, dispatch]);

	if (isLoading && !track) {
		return (<div>Loading</div>);
	}

	if (!track) {
		return (<div>Not Found</div>);
	}

	return (
		<Form
			onSubmit={onSubmit}
			initialValues={initialValues}
			keepDirtyOnReinitialize={false}
			component={TrackForm}
		/>
	);
};
