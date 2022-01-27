import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DashboardIcon from '@material-ui/icons/Dashboard';
import React from 'react';
import {
	ARTIST_LIST,
	DASHBOARD,
	EVENT_LIST,
	LABEL_LIST,
	RELEASE_LIST,
	TRACK_LIST,
	VENUE_LIST,
} from '../../../routing/route';
import { NavLink } from '../link';
import { useStyles } from './style';


export const NavbarLeft = () => {
	const classes = useStyles();

	return (
		<Drawer
			variant="permanent"
			classes={{ paper: classes.drawerPaper }}
			open={true}
		>
			<Toolbar className={classes.toolbar}>
				<Typography variant="h6" noWrap>
					DOL Admin
				</Typography>
			</Toolbar>

			<Divider/>

			<List>
				<ListItem button component={NavLink} to={DASHBOARD} exact>
					<ListItemIcon>
						<DashboardIcon/>
					</ListItemIcon>
					<ListItemText primary="Dashboard"/>
				</ListItem>

				<ListItem button component={NavLink} to={ARTIST_LIST}>
					<ListItemIcon>
						<DashboardIcon/>
					</ListItemIcon>
					<ListItemText primary="Artists"/>
				</ListItem>

				<ListItem button component={NavLink} to={LABEL_LIST}>
					<ListItemIcon>
						<DashboardIcon/>
					</ListItemIcon>
					<ListItemText primary="Labels"/>
				</ListItem>

				<ListItem button component={NavLink} to={RELEASE_LIST}>
					<ListItemIcon>
						<DashboardIcon/>
					</ListItemIcon>
					<ListItemText primary="Releases"/>
				</ListItem>

				<ListItem button component={NavLink} to={TRACK_LIST}>
					<ListItemIcon>
						<DashboardIcon/>
					</ListItemIcon>
					<ListItemText primary="Tracks"/>
				</ListItem>

				<ListItem button component={NavLink} to={VENUE_LIST}>
					<ListItemIcon>
						<DashboardIcon/>
					</ListItemIcon>
					<ListItemText primary="Venues"/>
				</ListItem>

				<ListItem button component={NavLink} to={EVENT_LIST}>
					<ListItemIcon>
						<DashboardIcon/>
					</ListItemIcon>
					<ListItemText primary="Events"/>
				</ListItem>
			</List>
		</Drawer>
	);
};
