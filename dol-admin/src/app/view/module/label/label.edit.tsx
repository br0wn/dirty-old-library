import React, { FunctionComponent, useCallback, useEffect, useMemo } from 'react';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Label } from '../../../../api/model/label';
import { updateLabel } from '../../../../api/sdk/label/update.label';
import { createFromException, createFromValidationResult } from '../../../../lib/final-form/submission.error';
import { RootState } from '../../../redux/module/_root';
import { loadLabel, selectById, updateSuccess } from '../../../redux/module/label';
import { createSelectLoader } from '../../../redux/module/loader';
import { LabelForm } from './label.form';

export interface LabelEditProps {
	id: string;
}

export const LabelEdit: FunctionComponent<LabelEditProps> = ({ id }) => {
	const selectLoader = useMemo(() => createSelectLoader(loadLabel.pending.type), []);
	const dispatch = useDispatch();

	const isLoading = useSelector(selectLoader);
	const label = useSelector((state: RootState) => selectById(state, id));

	const onSubmit = useCallback(async (values: Partial<Label>) => {
		let result;

		try {
			result = await updateLabel(id, values);
		} catch (e) {
			return createFromException(e.error || e);
		}

		if ('errorList' in result || 'errorMessage' in result) {
			return createFromValidationResult(result);
		}

		dispatch(updateSuccess(result as Label));

	}, [id, dispatch]);

	const initialValues = useMemo(() => ({
		...(label || {}),
	}), [label]);

	useEffect(() => {
		dispatch(loadLabel(id));
	}, [id, dispatch]);

	if (isLoading && !label) {
		return (<div>Loading</div>);
	}

	if (!label) {
		return (<div>Not Found</div>);
	}

	return (
		<Form
			onSubmit={onSubmit}
			initialValues={initialValues}
			keepDirtyOnReinitialize={false}
			component={LabelForm}
		/>
	);
};
