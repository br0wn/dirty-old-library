import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		marginLeft: theme.navbarLeft.width,
		width: `calc(100% - ${theme.navbarLeft.width}px)`,
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: theme.navbarLeft.width,
	},
}));
