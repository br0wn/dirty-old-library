import { Button, Grid } from '@material-ui/core';
import { DataGrid, GridColDef, GridSelectionModelChangeParams, GridSortDirection } from '@material-ui/data-grid';
import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadArtistList, selectAll } from '../../../redux/module/artist';
import { createSelectLoader } from '../../../redux/module/loader';

export interface ArtistSelectProps {
	selectMultiple?: boolean;
	onSubmit?: (artistList: string[]) => void;
	onCancel?: () => void;
}

export const ArtistSelect: FunctionComponent<ArtistSelectProps> = (props) => {
	const selectLoader = useMemo(() => createSelectLoader(loadArtistList.pending.type), []);
	const dispatch = useDispatch();

	const isListLoading = useSelector(selectLoader);
	const artistList = useSelector(selectAll);

	useEffect(() => {
		dispatch(loadArtistList());
	}, [dispatch]);

	const [selected, setSelected] = useState<string[]>([]);

	const onSelectionModelChange = useCallback((params: GridSelectionModelChangeParams) => {
		setSelected(params.selectionModel as string[]);
	}, [setSelected]);

	const onSubmit = useCallback(() => {
		props.onSubmit?.(selected);
	}, [props, selected]);

	const onCancel = useCallback(() => {
		setSelected([]);
		props.onCancel?.();
	}, [props, setSelected]);

	return (
		<Grid container direction="column" style={{ height: '100%', minHeight: 600 }}>
			<Grid item style={{ flex: 2, height: '100%', marginBottom: 10 }}>
				<DataGrid
					rowHeight={30}
					loading={isListLoading}
					columns={dataGridColumns}
					rows={artistList}
					disableColumnSelector
					disableColumnReorder
					disableColumnResize
					disableMultipleColumnsFiltering
					disableMultipleSelection={props.selectMultiple ? undefined : true}
					disableMultipleColumnsSorting
					disableDensitySelector
					showCellRightBorder={false}
					sortModel={dataGridSortModel}
					checkboxSelection={props.selectMultiple}
					onSelectionModelChange={onSelectionModelChange}
					selectionModel={selected}
					hideFooterSelectedRowCount
				/>
			</Grid>

			<Grid item container spacing={2} justify="center">
				<Grid item>
					<Button variant="contained" color="primary" onClick={onSubmit}>
						Confirm Selection
					</Button>
				</Grid>
				<Grid item>
					<Button variant="contained" color="default" onClick={onCancel}>
						Cancel
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};

/*
 * Table
 */
const dataGridSortModel = [
	{
		field: 'name',
		sort: 'asc' as GridSortDirection,
	},
];

const dataGridColumns: GridColDef[] = [
	{ field: 'name', headerName: 'Name', flex: 2 },
];
