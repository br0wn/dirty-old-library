import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& > .MuiFormControl-root': {
				margin: theme.spacing(1),
			},
		},
		section: {
			margin: theme.spacing(3),

			'& > .MuiFormControl-root': {
				margin: theme.spacing(1),
			},
		},
	}),
);
