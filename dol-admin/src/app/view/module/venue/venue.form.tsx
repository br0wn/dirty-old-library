import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { TextField } from 'mui-rff';
import React, { FunctionComponent } from 'react';
import { FormRenderProps } from 'react-final-form';
import { Venue } from '../../../../api/model/venue';

export interface VenueFormProps extends FormRenderProps<Partial<Venue>> {
	submitSuccessMessage?: string
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& > *': {
				margin: theme.spacing(1),
			},
		},
	}),
);

export const VenueForm: FunctionComponent<VenueFormProps> = (props) => {
	const classes = useStyles();

	return (
		<form className={classes.root} onSubmit={props.handleSubmit}>

			{props.submitSucceeded && (
				<Alert severity="success">
					{props.submitSuccessMessage}
				</Alert>
			)}

			{props.submitError && (
				<Alert severity="error">{props.submitError}</Alert>
			)}

			<TextField
				name="name"
				label="Name"
			/>

			<TextField
				name="description"
				multiline
				label="Description"
			/>

			<Button
				type="submit"
				variant="contained"
				color="primary"
				disabled={props.submitting}
			>
				Submit
			</Button>
		</form>
	);
};

VenueForm.defaultProps = {
	submitSuccessMessage: 'Changes are saved!',
};
