import React, { FunctionComponent, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Release } from '../../../../api/model/release';
import { createRelease } from '../../../../api/sdk/release/create.release';
import { createFromException, createFromValidationResult } from '../../../../lib/final-form/submission.error';
import { updateSuccess } from '../../../redux/module/release';
import { RELEASE_LIST } from '../../../routing/route';
import { ReleaseForm } from './release.form';

export interface ReleaseCreateProps {
}

export const ReleaseCreate: FunctionComponent<ReleaseCreateProps> = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const onSubmit = useCallback(async (values: Partial<Release>) => {
		let result;

		try {
			result = await createRelease(values);
		} catch (e) {
			return createFromException(e.error || e);
		}

		if ('errorList' in result || 'errorMessage' in result) {
			return createFromValidationResult(result);
		}

		dispatch(updateSuccess(result.release));

		setTimeout(function () {
			history.push(RELEASE_LIST);
		}, 1000);
	}, [dispatch, history]);

	return (
		<ReleaseForm
			onSubmit={onSubmit}
		/>
	);
};
