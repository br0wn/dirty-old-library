import { Button, Typography } from '@material-ui/core';
import { DataGrid, GridCellParams, GridColDef, GridSortDirection } from '@material-ui/data-grid';
import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { createSelectLoader } from '../../../redux/module/loader';
import { loadVenueList, selectAll } from '../../../redux/module/venue';
import { VENUE_CREATE, VENUE_EDIT, VENUE_VIEW } from '../../../routing/route';

export interface VenueListProps {
}

export const VenueList: FunctionComponent<VenueListProps> = () => {
	const selectLoader = useMemo(() => createSelectLoader(loadVenueList.pending.type), []);
	const dispatch = useDispatch();

	const isListLoading = useSelector(selectLoader);
	const venueList = useSelector(selectAll);

	useEffect(() => {
		dispatch(loadVenueList());
	}, [dispatch]);

	return (
		<>
			<Typography variant="body1" component="h2" gutterBottom>
				<Button variant="contained" color="primary" component={NavLink} to={VENUE_CREATE}>
					Add new Venue
				</Button>
			</Typography>

			<DataGrid
				autoHeight
				pageSize={100}
				loading={isListLoading}
				columns={dataGridColumns}
				rows={venueList}
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
				to={VENUE_VIEW.replace(':id', props.value as string)}
			>
				View
			</Button>
			<Button
				variant="contained"
				color="primary"
				size="small"
				style={{ marginLeft: 16 }}
				component={Link}
				to={VENUE_EDIT.replace(':id', props.value as string)}
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
