import { Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@material-ui/core';
import { ArrowDownward, ArrowUpward, RemoveCircle } from '@material-ui/icons';
import React, { FunctionComponent, useCallback } from 'react';
import { Field } from 'react-final-form';
import { FieldArrayRenderProps } from 'react-final-form-arrays';
import { ReleaseArtist } from '../../../../api/model/release';
import { useModal } from '../../component/modal/modal.hook';
import { ArtistProvider } from '../artist/artist.hoc';
import { ArtistSelect } from '../artist/artist.select';

export const ReleaseArtistListField: FunctionComponent<FieldArrayRenderProps<Partial<ReleaseArtist>, HTMLFormElement>> = (props) => {
	const selectArtistModal = useModal();

	const onArtistSelected = useCallback((idList) => {
		props.fields.push({
			artistId: idList[0],
		});

		selectArtistModal.handleClose();
	}, [selectArtistModal, props.fields]);

	const onArtistSwap = useCallback((indexA, indexB) => {
		props.fields.swap(indexA, indexB);
	}, [props.fields]);

	const onArtistRemove = useCallback((index) => {
		props.fields.remove(index);
	}, [props.fields]);

	return (
		<>
			{props.fields.map((name, index) => (
				<Grid style={{ marginBottom: 10 }} container spacing={2} key={name} alignItems="center">
					<Grid item style={{ width: 180 }}>
						<IconButton color="secondary" onClick={() => onArtistRemove(index)}>
							<RemoveCircle/>
						</IconButton>

						{(index - 1) >= 0 && (
							<IconButton color="secondary" onClick={() => onArtistSwap(index, index - 1)}>
								<ArrowUpward/>
							</IconButton>
						)}
						{(index + 1) < props.fields.length! && (
							<IconButton color="secondary" onClick={() => onArtistSwap(index, index + 1)}>
								<ArrowDownward/>
							</IconButton>
						)}
					</Grid>

					<Grid item style={{ width: 150 }}>
						<Typography variant="body1" component="p">
							{index === 0 ? <>Main Artist</> : <>Featured Artist</>}
						</Typography>
					</Grid>

					<Grid item style={{ width: 450 }}>
						<Field name={`${name}.artistId`}>
							{(props) => (
								<ArtistProvider id={props.input.value}>
									{(artist) => (
										<Typography variant="h5" component="p" noWrap>
											{artist?.name}
										</Typography>
									)}
								</ArtistProvider>
							)}
						</Field>
					</Grid>
				</Grid>
			))}

			<Button variant="outlined" color="primary" onClick={selectArtistModal.handleOpen}>
				{!props.fields.length ? (
					<>Select Artist</>
				) : (
					<>Add Featured artist</>
				)}
			</Button>

			<Dialog
				open={selectArtistModal.isOpen}
				onClose={selectArtistModal.handleClose}
			>
				<DialogTitle>Select Artist</DialogTitle>
				<DialogContent>
					<ArtistSelect
						onSubmit={onArtistSelected}
						onCancel={selectArtistModal.handleClose}
					/>
				</DialogContent>
			</Dialog>
		</>
	);
};
