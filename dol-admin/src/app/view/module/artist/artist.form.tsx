import { Button, MenuItem, TextField as RawTextField, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import arrayMutators from 'final-form-arrays';
import { Select, TextField } from 'mui-rff';
import React, { FunctionComponent, useEffect } from 'react';
import { FieldRenderProps, Form, FormProps } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { useDispatch, useSelector } from 'react-redux';
import { Artist, ArtistType } from '../../../../api/model/artist';
import { RootState } from '../../../redux/module/_root';
import { loadArtist, selectById } from '../../../redux/module/artist';
import { useStyles } from '../../component/form/style';
import { LinkListField } from '../meta-data/link.form';

export interface ArtistFormProps {
	submitSuccessMessage?: string
	initialValues?: Partial<Artist>;
	onSubmit: FormProps<Partial<Artist>>['onSubmit'];
}

export const ArtistForm: FunctionComponent<ArtistFormProps> = (props) => {
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
						General Info
					</Typography>

					<section className={classes.section}>
						<Select
							name="type"
							label="Type"
							defaultValue={ArtistType.ARTIST}
							fieldProps={{ initialValue: ArtistType.ARTIST }}
							disabled
						>
							<MenuItem value={ArtistType.ARTIST}>Artist</MenuItem>
						</Select>

						<TextField
							name="name"
							label="Name"
						/>

						<TextField
							name="description"
							multiline
							label="Description"
						/>
					</section>

					<Typography variant="h5" component="h5">
						Links
					</Typography>

					<section className={classes.section}>
						<FieldArray name="linkList" component={LinkListField}/>
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

ArtistForm.defaultProps = {
	submitSuccessMessage: 'Saved!',
};

export const ArtistField: FunctionComponent<FieldRenderProps<Artist['id']>> = (props) => {
	const id = props.input.value;

	const artist = useSelector((state: RootState) => selectById(state, id || ''));
	const dispatch = useDispatch();

	useEffect(() => {
		if (!!id && !artist) {
			dispatch(loadArtist(id));
		}
	}, [id, dispatch, artist]);

	return (
		<RawTextField
			label="Artist Name"
			InputProps={{
				readOnly: true,
			}}
			value={artist?.name || ''}
		/>
	);
};
