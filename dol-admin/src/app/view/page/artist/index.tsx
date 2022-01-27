import { Paper } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { ARTIST_CREATE, ARTIST_EDIT, ARTIST_LIST, ARTIST_VIEW } from '../../../routing/route';
import { ArtistCreate } from '../../module/artist/artist.create';
import { ArtistEdit } from '../../module/artist/artist.edit';
import { ArtistList } from '../../module/artist/artist.list';
import { ArtistView } from '../../module/artist/artist.view';

export interface DashboardProps extends RouteComponentProps {
}


export const Artist: FunctionComponent<DashboardProps> = () => {
	return (
		<Paper elevation={1} style={{ margin: 10, padding: 20 }}>
			<Switch>
				<Route path={ARTIST_LIST} exact>
					<ArtistList/>
				</Route>

				<Route path={ARTIST_CREATE} exact render={() => (
					<ArtistCreate/>
				)}/>

				<Route path={ARTIST_VIEW} exact render={(props) => (
					<ArtistView id={props.match.params.id}/>
				)}/>

				<Route path={ARTIST_EDIT} exact render={(props) => (
					<ArtistEdit id={props.match.params.id}/>
				)}/>


			</Switch>
		</Paper>
	);
};
