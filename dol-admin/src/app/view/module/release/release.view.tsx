import { Avatar, Button, Grid, Typography } from '@material-ui/core';
import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../redux/module/_root';
import { createSelectLoader } from '../../../redux/module/loader';
import { loadRelease, selectById } from '../../../redux/module/release';
import { RELEASE_EDIT } from '../../../routing/route';

export interface ReleaseViewProps {
	id: string;
}

export const ReleaseView: FunctionComponent<ReleaseViewProps> = ({ id }) => {
	const selectLoader = useMemo(() => createSelectLoader(loadRelease.pending.type), []);
	const dispatch = useDispatch();

	const isLoading = useSelector(selectLoader);
	const release = useSelector((state: RootState) => selectById(state, id));

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
		<div>
			<Grid container direction="row" spacing={1}>
				<Grid item>
					<Avatar alt={release.name} src={release.profilePicture?.url}/>
				</Grid>

				<Grid item>
					<Typography variant="h5" component="h1">
						{release.name}
					</Typography>
				</Grid>
			</Grid>

			<p>{release.description}</p>

			<Typography variant="subtitle1" component="p">
				Location
			</Typography>

			{!release.location ? (
				<p>No location</p>
			) : (
				<div>
					Country: {release.location.country}<br/>
					City: {release.location.city}<br/>
					ZIP: {release.location.zipCode}<br/>
					Address: {release.location.address}<br/>
					Lat: {release.location.latitude}<br/>
					Long: {release.location.longitude}
				</div>
			)}

			<Typography variant="subtitle1" component="p">
				Links
			</Typography>

			{(!release.linkList || release.linkList.length <= 0) ? (
				<p>No links</p>
			) : (
				release.linkList.map(link => (
					<div style={{ marginBottom: 5 }}>
						{link.title}<br/>
						{link.type}<br/>
						{link.url}
					</div>
				))
			)}

			<Typography variant="subtitle1" component="p">
				Images
			</Typography>

			{(!release.pictureList || release.pictureList.length <= 0) ? (
				<p>No images</p>
			) : (
				release.pictureList.map(image => (
					<div style={{ marginBottom: 5 }}>
						{image.title}<br/>
						{image.description}<br/>
						{!image.url ? (
							<Avatar src={image.url}/>
						) : (
							<>No image</>
						)}
					</div>
				))
			)}

			<br/>
			<br/>

			<Button
				variant="contained" color="primary"
				component={Link}
				to={RELEASE_EDIT.replace(':id', release.id!)}
			>
				Edit
			</Button>

		</div>
	);
};

