import { Avatar, Button, Grid, Typography } from '@material-ui/core';
import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../redux/module/_root';
import { createSelectLoader } from '../../../redux/module/loader';
import { loadVenue, selectById } from '../../../redux/module/venue';
import { VENUE_EDIT } from '../../../routing/route';

export interface VenueViewProps {
	id: string;
}

export const VenueView: FunctionComponent<VenueViewProps> = ({ id }) => {
	const selectLoader = useMemo(() => createSelectLoader(loadVenue.pending.type), []);
	const dispatch = useDispatch();

	const isLoading = useSelector(selectLoader);
	const venue = useSelector((state: RootState) => selectById(state, id));

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
		<div>
			<Grid container direction="row" spacing={1}>
				<Grid item>
					<Avatar alt={venue.name} src={venue.profilePicture?.url}/>
				</Grid>

				<Grid item>
					<Typography variant="h5" component="h1">
						{venue.name}
					</Typography>
				</Grid>
			</Grid>

			<p>{venue.description}</p>

			<Typography variant="subtitle1" component="p">
				Location
			</Typography>

			{!venue.location ? (
				<p>No location</p>
			) : (
				<div>
					Country: {venue.location.country}<br/>
					City: {venue.location.city}<br/>
					ZIP: {venue.location.zipCode}<br/>
					Address: {venue.location.address}<br/>
					Lat: {venue.location.latitude}<br/>
					Long: {venue.location.longitude}
				</div>
			)}

			<Typography variant="subtitle1" component="p">
				Links
			</Typography>

			{(!venue.linkList || venue.linkList.length <= 0) ? (
				<p>No links</p>
			) : (
				venue.linkList.map(link => (
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

			{(!venue.pictureList || venue.pictureList.length <= 0) ? (
				<p>No images</p>
			) : (
				venue.pictureList.map(image => (
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
				to={VENUE_EDIT.replace(':id', venue.id!)}
			>
				Edit
			</Button>

		</div>
	);
};

