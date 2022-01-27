import React, { FunctionComponent, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Artist } from '../../../../api/model/artist';
import { updateArtist } from '../../../../api/sdk/artist/update.artist';
import { createFromException, createFromValidationResult } from '../../../../lib/final-form/submission.error';
import { RootState } from '../../../redux/module/_root';
import { loadArtist, selectById, updateSuccess } from '../../../redux/module/artist';
import { createSelectLoader } from '../../../redux/module/loader';
import { ArtistForm } from './artist.form';

export interface ArtistEditProps {
	id: string;
}

export const ArtistEdit: FunctionComponent<ArtistEditProps> = ({ id }) => {
	const selectLoader = useMemo(() => createSelectLoader(loadArtist.pending.type), []);
	const dispatch = useDispatch();

	const isLoading = useSelector(selectLoader);
	const artist = useSelector((state: RootState) => selectById(state, id));

	const onSubmit = useCallback(async (values: Partial<Artist>) => {
		let result;

		try {
			result = await updateArtist(id, values);
		} catch (e) {
			return createFromException(e.error || e);
		}

		if ('errorList' in result || 'errorMessage' in result) {
			return createFromValidationResult(result);
		}

		dispatch(updateSuccess(result as Artist));
	}, [id, dispatch]);

	const initialValues = useMemo(() => ({
		...(artist || {}),
	}), [artist]);

	useEffect(() => {
		dispatch(loadArtist(id));
	}, [id, dispatch]);

	if (isLoading && !artist) {
		return (<div>Loading</div>);
	}

	if (!artist) {
		return (<div>Not Found</div>);
	}

	return (
		<ArtistForm
			onSubmit={onSubmit}
			initialValues={initialValues}
		/>
	);
};
