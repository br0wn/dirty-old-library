import { Paper } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { TRACK_CREATE, TRACK_EDIT, TRACK_LIST, TRACK_VIEW } from '../../../routing/route';
import { TrackCreate } from '../../module/track/track.create';
import { TrackEdit } from '../../module/track/track.edit';
import { TrackList } from '../../module/track/track.list';
import { TrackView } from '../../module/track/track.view';

export interface DashboardProps extends RouteComponentProps {
}


export const Track: FunctionComponent<DashboardProps> = () => {
	return (
		<Paper elevation={1} style={{ margin: 10, padding: 20 }}>
			<Switch>
				<Route path={TRACK_LIST} exact>
					<TrackList/>
				</Route>

				<Route path={TRACK_CREATE} exact render={() => (
					<TrackCreate/>
				)}/>

				<Route path={TRACK_VIEW} exact render={(props) => (
					<TrackView id={props.match.params.id}/>
				)}/>

				<Route path={TRACK_EDIT} exact render={(props) => (
					<TrackEdit id={props.match.params.id}/>
				)}/>
			</Switch>
		</Paper>
	);
};
