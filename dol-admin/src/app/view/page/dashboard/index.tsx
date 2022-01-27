import { Paper, Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { selectAuthUser } from '../../../redux/module/auth';

export interface DashboardProps extends RouteComponentProps {
}

export const Dashboard: FunctionComponent<DashboardProps> = () => {
	const user = useSelector(selectAuthUser);

	return (
		<Paper elevation={1} style={{ margin: 10, padding: 20 }}>
			<Typography variant="h4" component="h1" gutterBottom>
				Welcome back, {user?.firstName || 'User'}
			</Typography>
			<Typography variant="body1" component="h2" gutterBottom>
				This is the Admin interface of Dirty Old Library.<br/>
				Please use menu on the left for navigation.
			</Typography>
		</Paper>
	);
};
