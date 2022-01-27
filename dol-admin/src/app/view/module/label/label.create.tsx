import React, { FunctionComponent, useCallback } from 'react';
import { Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Label } from '../../../../api/model/label';
import { createLabel } from '../../../../api/sdk/label/create.label';
import { createFromException, createFromValidationResult } from '../../../../lib/final-form/submission.error';
import { ValidationResult } from '../../../../lib/validator/validation.result';
import { updateSuccess } from '../../../redux/module/label';
import { LABEL_EDIT } from '../../../routing/route';
import { LabelForm } from './label.form';

export interface LabelCreateProps {
}

export const LabelCreate: FunctionComponent<LabelCreateProps> = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const onSubmit = useCallback(async (values: Partial<Label>) => {
		let result: Label | ValidationResult;

		try {
			result = await createLabel(values);
		} catch (e) {
			return createFromException(e.error || e);
		}

		if ('errorList' in result || 'errorMessage' in result) {
			return createFromValidationResult(result);
		}

		dispatch(updateSuccess(result as Label));

		setTimeout(function () {
			history.push(LABEL_EDIT.replace(':id', (result as Label).id!));
		}, 1000);
	}, [dispatch, history]);

	return (
		<Form
			onSubmit={onSubmit}
			render={props => (
				<LabelForm
					{...props}
					submitSuccessMessage={
						LabelForm.defaultProps?.submitSuccessMessage + ' You will be redirected to Edit page in a second.'
					}
				/>
			)}
		/>
	);
};
