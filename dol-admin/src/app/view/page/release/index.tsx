import { Paper } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { RELEASE_CREATE, RELEASE_EDIT, RELEASE_LIST, RELEASE_VIEW } from '../../../routing/route';
import { ReleaseCreate } from '../../module/release/release.create';
import { ReleaseEdit } from '../../module/release/release.edit';
import { ReleaseList } from '../../module/release/release.list';
import { ReleaseView } from '../../module/release/release.view';

export interface DashboardProps extends RouteComponentProps {
}


export const Release: FunctionComponent<DashboardProps> = () => {
	return (
		<Paper elevation={1} style={{ margin: 10, padding: 20 }}>
			<Switch>
				<Route path={RELEASE_LIST} exact>
					<ReleaseList/>
				</Route>

				<Route path={RELEASE_CREATE} exact render={() => (
					<ReleaseCreate/>
				)}/>

				<Route path={RELEASE_VIEW} exact render={(props) => (
					<ReleaseView id={props.match.params.id}/>
				)}/>

				<Route path={RELEASE_EDIT} exact render={(props) => (
					<ReleaseEdit id={props.match.params.id}/>
				)}/>


			</Switch>
		</Paper>
	);
};
