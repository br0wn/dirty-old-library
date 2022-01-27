import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import React, { FunctionComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ARTIST_LIST, DASHBOARD, EVENT_LIST, LABEL_LIST, RELEASE_LIST, TRACK_LIST, VENUE_LIST } from '../routing/route';
import { NavbarLeft } from './component/navbar/navbar.left';
import { NavbarTop } from './component/navbar/navbar.top';
import { Artist } from './page/artist';
import { Dashboard } from './page/dashboard';
import { Event } from './page/event';
import { Label } from './page/label';
import { Release } from './page/release';
import { Track } from './page/track';
import { Venue } from './page/venue';

export interface AppProps {
	baseUrl?: string;
}

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
}));

export const App: FunctionComponent<AppProps> = () => {
	const classes = useStyles();

	return (
		<BrowserRouter>
			<div className={classes.root}>
				<CssBaseline/>

				<NavbarTop/>
				<NavbarLeft/>

				<main className={classes.content}>
					<div className={classes.appBarSpacer}/>

					<Switch>
						<Route path={DASHBOARD} exact component={Dashboard}/>
						<Route path={ARTIST_LIST} component={Artist}/>
						<Route path={LABEL_LIST} component={Label}/>
						<Route path={RELEASE_LIST} component={Release}/>
						<Route path={TRACK_LIST} component={Track}/>
						<Route path={VENUE_LIST} component={Venue}/>
						<Route path={EVENT_LIST} component={Event}/>
					</Switch>
				</main>

			</div>
		</BrowserRouter>
	);
};
