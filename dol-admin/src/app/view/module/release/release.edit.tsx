import React, { FunctionComponent, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Release } from '../../../../api/model/release';
import { updateRelease } from '../../../../api/sdk/release/update.release';
import { createFromException, createFromValidationResult } from '../../../../lib/final-form/submission.error';
import { RootState } from '../../../redux/module/_root';
import { createSelectLoader } from '../../../redux/module/loader';
import { loadRelease, selectById, updateSuccess } from '../../../redux/module/release';
import { ReleaseForm } from './release.form';

export interface ReleaseEditProps {
	id: string;
}

export const ReleaseEdit: FunctionComponent<ReleaseEditProps> = ({ id }) => {
	const selectLoader = useMemo(() => createSelectLoader(loadRelease.pending.type), []);
	const dispatch = useDispatch();

	const isLoading = useSelector(selectLoader);
	const release = useSelector((state: RootState) => selectById(state, id));

	const onSubmit = useCallback(async (values: Partial<Release>) => {
		let result;

		try {
			result = await updateRelease(id, values);
		} catch (e) {
			return createFromException(e.error || e);
		}

		if ('errorList' in result || 'errorMessage' in result) {
			return createFromValidationResult(result);
		}

		dispatch(updateSuccess(result as Release));

	}, [id, dispatch]);

	const initialValues = useMemo(() => ({
		...(release || {}),
	}), [release]);

	useEffect(() => {
		dispatch(loadRelease(id));
	}, [id, dispatch]);

	if (isLoading && !release) {
		return (<div>Loading</div>);
	}

	if (!release) {
		return (<div>Not Found</div>);
	}

	return (
		<ReleaseForm
			onSubmit={onSubmit}
			initialValues={initialValues}
		/>
	);
};
