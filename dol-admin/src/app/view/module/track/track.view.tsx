import { Button, Typography } from '@material-ui/core';
import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../redux/module/_root';
import { createSelectLoader } from '../../../redux/module/loader';
import { loadTrack, selectById } from '../../../redux/module/track';
import { TRACK_EDIT } from '../../../routing/route';

export interface TrackViewProps {
	id: string;
}

export const TrackView: FunctionComponent<TrackViewProps> = ({ id }) => {
	const selectLoader = useMemo(() => createSelectLoader(loadTrack.pending.type), []);
	const dispatch = useDispatch();

	const isLoading = useSelector(selectLoader);
	const track = useSelector((state: RootState) => selectById(state, id));

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
		<div>
			<Typography variant="h5" component="h1">
				{track.name}
			</Typography>

			<p>{track.description}</p>

			<br/>
			<br/>

			<Button
				variant="contained" color="primary"
				component={Link}
				to={TRACK_EDIT.replace(':id', track.id!)}
			>
				Edit
			</Button>

		</div>
	);
};

