import { Button, Typography } from '@material-ui/core';
import { DataGrid, GridCellParams, GridColDef, GridSortDirection } from '@material-ui/data-grid';
import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { createSelectLoader } from '../../../redux/module/loader';
import { loadReleaseList, selectAll } from '../../../redux/module/release';
import { RELEASE_CREATE, RELEASE_EDIT, RELEASE_VIEW } from '../../../routing/route';

export interface ReleaseListProps {
}

export const ReleaseList: FunctionComponent<ReleaseListProps> = () => {
	const selectLoader = useMemo(() => createSelectLoader(loadReleaseList.pending.type), []);
	const dispatch = useDispatch();

	const isListLoading = useSelector(selectLoader);
	const releaseList = useSelector(selectAll);

	useEffect(() => {
		dispatch(loadReleaseList());
	}, [dispatch]);

	return (
		<>
			<Typography variant="body1" component="h2" gutterBottom>
				<Button variant="contained" color="primary" component={NavLink} to={RELEASE_CREATE}>
					Add new Release
				</Button>
			</Typography>

			<DataGrid
				autoHeight
				pageSize={100}
				loading={isListLoading}
				columns={dataGridColumns}
				rows={releaseList}
				disableColumnSelector
				disableSelectionOnClick
				disableColumnReorder
				disableColumnResize
				disableMultipleColumnsFiltering
				disableMultipleSelection
				disableMultipleColumnsSorting
				disableDensitySelector
				showCellRightBorder={false}
				sortModel={dataGridSortModel}
			/>
		</>
	);
};

/*
 * Table
 */
const RowActionsCell = (props: GridCellParams) => {
	return (
		<>
			<Button
				variant="contained"
				color="primary"
				size="small"
				component={Link}
				to={RELEASE_VIEW.replace(':id', props.value as string)}
			>
				View
			</Button>
			<Button
				variant="contained"
				color="primary"
				size="small"
				style={{ marginLeft: 16 }}
				component={Link}
				to={RELEASE_EDIT.replace(':id', props.value as string)}
			>
				Edit
			</Button>
		</>
	);
};

const dataGridSortModel = [
	{
		field: 'name',
		sort: 'asc' as GridSortDirection,
	},
];

const dataGridColumns: GridColDef[] = [
	{ field: 'name', headerName: 'Name', flex: 2 },
	{
		field: 'id', headerName: 'Actions',
		sortable: false, filterable: false,
		disableColumnMenu: true,
		align: 'right', flex: 1,
		renderCell: RowActionsCell,
	},
];
