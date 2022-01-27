import { Button, Grid, IconButton } from '@material-ui/core';
import { ArrowDownward, ArrowUpward, RemoveCircle } from '@material-ui/icons';
import { TextField } from 'mui-rff';
import React, { FunctionComponent, useCallback } from 'react';
import { FieldArrayRenderProps } from 'react-final-form-arrays';
import { Link } from '../../../../api/model/meta.data';

export const LinkListField: FunctionComponent<FieldArrayRenderProps<Partial<Link>, HTMLFormElement>> = (props) => {
	const onLinkAdd = useCallback(() => {
		props.fields.push({});
	}, [props.fields]);

	const onLinkSwap = useCallback((indexA, indexB) => {
		props.fields.swap(indexA, indexB);
	}, [props.fields]);

	const onLinkRemove = useCallback((index) => {
		props.fields.remove(index);
	}, [props.fields]);

	return (
		<>
			{props.fields.map((name, index) => (
				<Grid style={{ marginBottom: 10 }} alignItems="center" container spacing={1} key={name}>
					<Grid item style={{ width: 180 }}>
						<IconButton color="secondary" onClick={() => onLinkRemove(index)}>
							<RemoveCircle/>
						</IconButton>
						{(index - 1) >= 0 && (
							<IconButton color="secondary" onClick={() => onLinkSwap(index, index - 1)}>
								<ArrowUpward/>
							</IconButton>
						)}
						{(index + 1) < props.fields.length! && (
							<IconButton color="secondary" onClick={() => onLinkSwap(index, index + 1)}>
								<ArrowDownward/>
							</IconButton>
						)}
					</Grid>
					<Grid item>
						<TextField
							name={`${name}.title`}
							label="Title"
						/>
					</Grid>
					<Grid item>
						<TextField
							name={`${name}.url`}
							multiline
							label="URL"
						/>
					</Grid>
				</Grid>
			))}

			<Button variant="outlined" color="primary" onClick={onLinkAdd}>
				Add Link
			</Button>
		</>
	);
};
