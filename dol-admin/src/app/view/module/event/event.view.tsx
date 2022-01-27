import { Avatar, Button, Grid, Typography } from '@material-ui/core';
import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../redux/module/_root';
import { loadEvent, selectById } from '../../../redux/module/event';
import { createSelectLoader } from '../../../redux/module/loader';
import { EVENT_EDIT } from '../../../routing/route';

export interface EventViewProps {
	id: string;
}

export const EventView: FunctionComponent<EventViewProps> = ({ id }) => {
	const selectLoader = useMemo(() => createSelectLoader(loadEvent.pending.type), []);
	const dispatch = useDispatch();

	const isLoading = useSelector(selectLoader);
	const event = useSelector((state: RootState) => selectById(state, id));

	useEffect(() => {
		dispatch(loadEvent(id));
	}, [id, dispatch]);

	if (isLoading && !event) {
		return (<div>Loading</div>);
	}

	if (!event) {
		return (<div>Not Found</div>);
	}

	return (
		<div>
			<Grid container direction="row" spacing={1}>
				<Grid item>
					<Avatar alt={event.name} src={event.profilePicture?.url}/>
				</Grid>

				<Grid item>
					<Typography variant="h5" component="h1">
						{event.name}
					</Typography>
				</Grid>
			</Grid>

			<p>{event.description}</p>

			<Typography variant="subtitle1" component="p">
				Location
			</Typography>

			{!event.location ? (
				<p>No location</p>
			) : (
				<div>
					Country: {event.location.country}<br/>
					City: {event.location.city}<br/>
					ZIP: {event.location.zipCode}<br/>
					Address: {event.location.address}<br/>
					Lat: {event.location.latitude}<br/>
					Long: {event.location.longitude}
				</div>
			)}

			<Typography variant="subtitle1" component="p">
				Links
			</Typography>

			{(!event.linkList || event.linkList.length <= 0) ? (
				<p>No links</p>
			) : (
				event.linkList.map(link => (
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

			{(!event.pictureList || event.pictureList.length <= 0) ? (
				<p>No images</p>
			) : (
				event.pictureList.map(image => (
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
				to={EVENT_EDIT.replace(':id', event.id!)}
			>
				Edit
			</Button>

		</div>
	);
};

