import { Paper } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { LABEL_CREATE, LABEL_EDIT, LABEL_LIST, LABEL_VIEW } from '../../../routing/route';
import { LabelCreate } from '../../module/label/label.create';
import { LabelEdit } from '../../module/label/label.edit';
import { LabelList } from '../../module/label/label.list';
import { LabelView } from '../../module/label/label.view';

export interface DashboardProps extends RouteComponentProps {
}


export const Label: FunctionComponent<DashboardProps> = () => {
	return (
		<Paper elevation={1} style={{ margin: 10, padding: 20 }}>
			<Switch>
				<Route path={LABEL_LIST} exact>
					<LabelList/>
				</Route>

				<Route path={LABEL_CREATE} exact render={() => (
					<LabelCreate/>
				)}/>

				<Route path={LABEL_VIEW} exact render={(props) => (
					<LabelView id={props.match.params.id}/>
				)}/>

				<Route path={LABEL_EDIT} exact render={(props) => (
					<LabelEdit id={props.match.params.id}/>
				)}/>


			</Switch>
		</Paper>
	);
};
