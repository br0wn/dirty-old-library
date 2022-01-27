import { Paper } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { VENUE_CREATE, VENUE_EDIT, VENUE_LIST, VENUE_VIEW } from '../../../routing/route';
import { VenueCreate } from '../../module/venue/venue.create';
import { VenueEdit } from '../../module/venue/venue.edit';
import { VenueList } from '../../module/venue/venue.list';
import { VenueView } from '../../module/venue/venue.view';

export interface DashboardProps extends RouteComponentProps {
}


export const Venue: FunctionComponent<DashboardProps> = () => {
	return (
		<Paper elevation={1} style={{ margin: 10, padding: 20 }}>
			<Switch>
				<Route path={VENUE_LIST} exact>
					<VenueList/>
				</Route>

				<Route path={VENUE_CREATE} exact render={() => (
					<VenueCreate/>
				)}/>

				<Route path={VENUE_VIEW} exact render={(props) => (
					<VenueView id={props.match.params.id}/>
				)}/>

				<Route path={VENUE_EDIT} exact render={(props) => (
					<VenueEdit id={props.match.params.id}/>
				)}/>


			</Switch>
		</Paper>
	);
};
