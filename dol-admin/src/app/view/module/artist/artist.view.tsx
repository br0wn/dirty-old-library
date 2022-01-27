import { Avatar, Button, Grid, Typography } from '@material-ui/core';
import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../redux/module/_root';
import { loadArtist, selectById } from '../../../redux/module/artist';
import { createSelectLoader } from '../../../redux/module/loader';
import { ARTIST_EDIT } from '../../../routing/route';

export interface ArtistViewProps {
	id: string;
}

export const ArtistView: FunctionComponent<ArtistViewProps> = ({ id }) => {
	const selectLoader = useMemo(() => createSelectLoader(loadArtist.pending.type), []);
	const dispatch = useDispatch();

	const isLoading = useSelector(selectLoader);
	const artist = useSelector((state: RootState) => selectById(state, id));

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
		<div>
			<Grid container direction="row" spacing={1}>
				<Grid item>
					<Avatar alt={artist.name} src={artist.profilePicture?.url}/>
				</Grid>

				<Grid item>
					<Typography variant="h5" component="h1">
						{artist.name}
					</Typography>
				</Grid>
			</Grid>

			<p>Type: {artist.type.toString()}</p>
			<p>Genre: {artist.genreList?.map(g => g.name).join(', ')}</p>
			<p>Style: {artist.styleList?.map(g => g.name).join(', ')}</p>

			<p>{artist.description}</p>

			<Typography variant="subtitle1" component="p">
				Location
			</Typography>

			{!artist.location ? (
				<p>No location</p>
			) : (
				<div>
					Country: {artist.location.country}<br/>
					City: {artist.location.city}<br/>
					ZIP: {artist.location.zipCode}<br/>
					Address: {artist.location.address}<br/>
					Lat: {artist.location.latitude}<br/>
					Long: {artist.location.longitude}
				</div>
			)}

			<Typography variant="subtitle1" component="p">
				Links
			</Typography>

			{(!artist.linkList || artist.linkList.length <= 0) ? (
				<p>No links</p>
			) : (
				artist.linkList.map(link => (
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

			{(!artist.pictureList || artist.pictureList.length <= 0) ? (
				<p>No images</p>
			) : (
				artist.pictureList.map(image => (
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
				to={ARTIST_EDIT.replace(':id', artist.id!)}
			>
				Edit
			</Button>

		</div>
	);
};

