import { Avatar, Button, Grid, Typography } from '@material-ui/core';
import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../redux/module/_root';
import { loadLabel, selectById } from '../../../redux/module/label';
import { createSelectLoader } from '../../../redux/module/loader';
import { LABEL_EDIT } from '../../../routing/route';

export interface LabelViewProps {
	id: string;
}

export const LabelView: FunctionComponent<LabelViewProps> = ({ id }) => {
	const selectLoader = useMemo(() => createSelectLoader(loadLabel.pending.type), []);
	const dispatch = useDispatch();

	const isLoading = useSelector(selectLoader);
	const label = useSelector((state: RootState) => selectById(state, id));

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
		<div>
			<Grid container direction="row" spacing={1}>
				<Grid item>
					<Avatar alt={label.name} src={label.profilePicture?.url}/>
				</Grid>

				<Grid item>
					<Typography variant="h5" component="h1">
						{label.name}
					</Typography>
				</Grid>
			</Grid>

			<p>{label.description}</p>

			<Typography variant="subtitle1" component="p">
				Location
			</Typography>

			{!label.location ? (
				<p>No location</p>
			) : (
				<div>
					Country: {label.location.country}<br/>
					City: {label.location.city}<br/>
					ZIP: {label.location.zipCode}<br/>
					Address: {label.location.address}<br/>
					Lat: {label.location.latitude}<br/>
					Long: {label.location.longitude}
				</div>
			)}

			<Typography variant="subtitle1" component="p">
				Links
			</Typography>

			{(!label.linkList || label.linkList.length <= 0) ? (
				<p>No links</p>
			) : (
				label.linkList.map(link => (
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

			{(!label.pictureList || label.pictureList.length <= 0) ? (
				<p>No images</p>
			) : (
				label.pictureList.map(image => (
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
				to={LABEL_EDIT.replace(':id', label.id!)}
			>
				Edit
			</Button>

		</div>
	);
};

