import { Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@material-ui/core';
import { ArrowDownward, ArrowUpward, RemoveCircle } from '@material-ui/icons';
import { TextField } from 'mui-rff';
import React, { FunctionComponent, useCallback } from 'react';
import { Field } from 'react-final-form';
import { FieldArrayRenderProps } from 'react-final-form-arrays';
import { ReleaseLabel } from '../../../../api/model/release';
import { useModal } from '../../component/modal/modal.hook';
import { LabelProvider } from '../label/label.hoc';
import { LabelSelect } from '../label/label.select';

export const ReleaseLabelListField: FunctionComponent<FieldArrayRenderProps<Partial<ReleaseLabel>, HTMLFormElement>> = (props) => {
	const selectLabelModal = useModal();

	const onLabelSelected = useCallback((idList) => {
		props.fields.push({
			labelId: idList[0],
		});

		selectLabelModal.handleClose();
	}, [selectLabelModal, props.fields]);

	const onLabelSwap = useCallback((indexA, indexB) => {
		props.fields.swap(indexA, indexB);
	}, [props.fields]);

	const onLabelRemove = useCallback((index) => {
		props.fields.remove(index);
	}, [props.fields]);

	return (
		<>
			{props.fields.map((name, index) => (
				<Grid style={{ marginBottom: 10 }} container spacing={2} key={name} alignItems="center">
					<Grid item style={{ width: 180 }}>
						<IconButton color="secondary" onClick={() => onLabelRemove(index)}>
							<RemoveCircle/>
						</IconButton>
						{(index - 1) >= 0 && (
							<IconButton color="secondary" onClick={() => onLabelSwap(index, index - 1)}>
								<ArrowUpward/>
							</IconButton>
						)}
						{(index + 1) < props.fields.length! && (
							<IconButton color="secondary" onClick={() => onLabelSwap(index, index + 1)}>
								<ArrowDownward/>
							</IconButton>
						)}
					</Grid>

					<Grid item>
						<TextField
							name={`${name}.releaseNumber`}
							label="Release Number"
							variant="outlined"
						/>
					</Grid>

					<Grid item style={{ width: 450 }}>
						<Field name={`${name}.labelId`}>
							{(props) => (
								<LabelProvider id={props.input.value}>
									{(label) => (
										<Typography variant="h5" component="p" noWrap>
											{label?.name}
										</Typography>
									)}
								</LabelProvider>
							)}
						</Field>
					</Grid>
				</Grid>
			))}

			<Button variant="outlined" color="primary" onClick={selectLabelModal.handleOpen}>
				Add Label
			</Button>

			<Dialog
				open={selectLabelModal.isOpen}
				onClose={selectLabelModal.handleClose}
			>
				<DialogTitle>Select Label</DialogTitle>
				<DialogContent>
					<LabelSelect
						onSubmit={onLabelSelected}
						onCancel={selectLabelModal.handleClose}
					/>
				</DialogContent>
			</Dialog>
		</>
	);
};
