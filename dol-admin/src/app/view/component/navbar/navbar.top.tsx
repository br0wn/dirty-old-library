import { IconButton } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ArrowBack } from '@material-ui/icons';
import React from 'react';
import { Link, Route } from 'react-router-dom';
import {
	ARTIST_LIST,
	DASHBOARD,
	EVENT_LIST,
	LABEL_LIST,
	RELEASE_LIST,
	TRACK_LIST,
	VENUE_LIST,
} from '../../../routing/route';
import { useStyles } from './style';

export const NavbarTop = () => {
	const classes = useStyles();

	return (
		<AppBar position="absolute" className={classes.appBar}>
			<Toolbar className={classes.toolbar}>
				<Typography variant="h6" noWrap>
					<Route exact path={DASHBOARD}>
						Dashboard
					</Route>
					<Route path={ARTIST_LIST} render={props => (
						<>
							{!props.match.isExact && (
								<IconButton component={Link} to={ARTIST_LIST} color="inherit">
									<ArrowBack/>
								</IconButton>
							)}

							Manage Artists
						</>
					)}/>
					<Route path={LABEL_LIST} render={props => (
						<>
							{!props.match.isExact && (
								<IconButton component={Link} to={LABEL_LIST} color="inherit">
									<ArrowBack/>
								</IconButton>
							)}

							Manage Labels
						</>
					)}/>
					<Route path={RELEASE_LIST} render={props => (
						<>
							{!props.match.isExact && (
								<IconButton component={Link} to={RELEASE_LIST} color="inherit">
									<ArrowBack/>
								</IconButton>
							)}

							Manage Releases
						</>
					)}/>
					<Route path={TRACK_LIST} render={props => (
						<>
							{!props.match.isExact && (
								<IconButton component={Link} to={TRACK_LIST} color="inherit">
									<ArrowBack/>
								</IconButton>
							)}

							Manage Tracks
						</>
					)}/>
					<Route path={VENUE_LIST} render={props => (
						<>
							{!props.match.isExact && (
								<IconButton component={Link} to={VENUE_LIST} color="inherit">
									<ArrowBack/>
								</IconButton>
							)}

							Manage Venues
						</>
					)}/>
					<Route path={EVENT_LIST} render={props => (
						<>
							{!props.match.isExact && (
								<IconButton component={Link} to={EVENT_LIST} color="inherit">
									<ArrowBack/>
								</IconButton>
							)}

							Manage Events
						</>
					)}/>
				</Typography>
			</Toolbar>
		</AppBar>
	);
};
