import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { TextField } from 'mui-rff';
import React, { FunctionComponent } from 'react';
import { FormRenderProps } from 'react-final-form';
import { Event } from '../../../../api/model/event';

export interface EventFormProps extends FormRenderProps<Partial<Event>> {
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

export const EventForm: FunctionComponent<EventFormProps> = (props) => {
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

EventForm.defaultProps = {
	submitSuccessMessage: 'Changes are saved!',
};
