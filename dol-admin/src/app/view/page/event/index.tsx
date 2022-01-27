import { Paper } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { EVENT_CREATE, EVENT_EDIT, EVENT_LIST, EVENT_VIEW } from '../../../routing/route';
import { EventCreate } from '../../module/event/event.create';
import { EventEdit } from '../../module/event/event.edit';
import { EventList } from '../../module/event/event.list';
import { EventView } from '../../module/event/event.view';

export interface DashboardProps extends RouteComponentProps {
}


export const Event: FunctionComponent<DashboardProps> = () => {
	return (
		<Paper elevation={1} style={{ margin: 10, padding: 20 }}>
			<Switch>
				<Route path={EVENT_LIST} exact>
					<EventList/>
				</Route>

				<Route path={EVENT_CREATE} exact render={() => (
					<EventCreate/>
				)}/>

				<Route path={EVENT_VIEW} exact render={(props) => (
					<EventView id={props.match.params.id}/>
				)}/>

				<Route path={EVENT_EDIT} exact render={(props) => (
					<EventEdit id={props.match.params.id}/>
				)}/>


			</Switch>
		</Paper>
	);
};
