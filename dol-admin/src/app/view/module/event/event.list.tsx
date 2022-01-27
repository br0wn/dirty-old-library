import { Button, Typography } from '@material-ui/core';
import { DataGrid, GridCellParams, GridColDef, GridSortDirection } from '@material-ui/data-grid';
import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { loadEventList, selectAll } from '../../../redux/module/event';
import { createSelectLoader } from '../../../redux/module/loader';
import { EVENT_CREATE, EVENT_EDIT, EVENT_VIEW } from '../../../routing/route';

export interface EventListProps {
}

export const EventList: FunctionComponent<EventListProps> = () => {
	const selectLoader = useMemo(() => createSelectLoader(loadEventList.pending.type), []);
	const dispatch = useDispatch();

	const isListLoading = useSelector(selectLoader);
	const eventList = useSelector(selectAll);

	useEffect(() => {
		dispatch(loadEventList());
	}, [dispatch]);

	return (
		<>
			<Typography variant="body1" component="h2" gutterBottom>
				<Button variant="contained" color="primary" component={NavLink} to={EVENT_CREATE}>
					Add new Event
				</Button>
			</Typography>

			<DataGrid
				autoHeight
				pageSize={100}
				loading={isListLoading}
				columns={dataGridColumns}
				rows={eventList}
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
				to={EVENT_VIEW.replace(':id', props.value as string)}
			>
				View
			</Button>
			<Button
				variant="contained"
				color="primary"
				size="small"
				style={{ marginLeft: 16 }}
				component={Link}
				to={EVENT_EDIT.replace(':id', props.value as string)}
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
