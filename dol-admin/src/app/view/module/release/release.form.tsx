import { Button, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import arrayMutators from 'final-form-arrays';
import { TextField } from 'mui-rff';
import React, { FunctionComponent } from 'react';
import { Form, FormProps } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { Release } from '../../../../api/model/release';
import { useStyles } from '../../component/form/style';
import { ReleaseArtistListField } from './release.artist.form';
import { ReleaseLabelListField } from './release.label.form';

export interface ReleaseFormProps {
	submitSuccessMessage?: string
	initialValues?: Partial<Release>;
	onSubmit: FormProps<Partial<Release>>['onSubmit'];
}

export const ReleaseForm: FunctionComponent<ReleaseFormProps> = (props) => {
	const classes = useStyles();

	return (
		<Form
			mutators={{
				...arrayMutators,
			}}
			onSubmit={props.onSubmit}
			initialValues={props.initialValues}
			keepDirtyOnReinitialize={false}
			render={(formProps) => (
				<form className={classes.root} onSubmit={formProps.handleSubmit}>

					{formProps.submitSucceeded && (
						<Alert severity="success">
							{props.submitSuccessMessage}
						</Alert>
					)}

					{formProps.submitError && (
						<Alert severity="error">{formProps.submitError}</Alert>
					)}

					<Typography variant="h5" component="h5">
						Artist
					</Typography>

					<section className={classes.section}>
						<FieldArray name="artistList" component={ReleaseArtistListField}/>
					</section>

					<Typography variant="h5" component="h5">
						General Info
					</Typography>

					<section className={classes.section}>
						<TextField
							name="name"
							label="Release title"
						/>

						<TextField
							name="description"
							multiline
							label="Description"
						/>
					</section>

					<Typography variant="h5" component="h5">
						Label
					</Typography>

					<section className={classes.section}>
						<FieldArray name="labelList" component={ReleaseLabelListField}/>
					</section>

					<Button
						type="submit"
						variant="contained"
						color="primary"
						disabled={formProps.submitting}
					>
						Submit
					</Button>
				</form>
			)}
		/>
	);
};

ReleaseForm.defaultProps = {
	submitSuccessMessage: 'Changes are saved!',
};
