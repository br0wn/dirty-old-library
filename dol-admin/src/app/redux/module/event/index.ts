import { createAsyncThunk, createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '../../../../api/model/event';
import { getEvent } from '../../../../api/sdk/event/get.event';
import { getEventList } from '../../../../api/sdk/event/get.event.list';
import { RootState } from '../_root';

const MODULE_NAME = 'event';

/*
 * State
 */
export interface EventState extends EntityState<Event> {
	loadedAt?: string
}

/*
 * Async Actions
 */
export const loadEventList = createAsyncThunk(
	MODULE_NAME + '/load',
	async (options: { force?: boolean } | void, thunkAPI) => {
		const state = thunkAPI.getState() as RootState;
		const sliceState = selectSliceState(state);

		if (!(!!options && options.force) && sliceState.ids.length > 0) {
			return undefined;
		}

		return await getEventList({});
	},
);

export const loadEvent = createAsyncThunk(
	MODULE_NAME + '/load-one',
	async (id: string) => {
		return await getEvent(id);
	},
);


/*
 * Entity Adapter
 */
const eventEntityAdapter = createEntityAdapter<Event>({
	selectId: model => model.id!,
});


/*
 * Slice
 */
const { name, reducer, actions } = createSlice({
	name: MODULE_NAME,
	initialState: eventEntityAdapter.getInitialState({
		loadedAt: undefined,
	}),
	reducers: {
		updateSuccess: (state, action: PayloadAction<Event>) => {
			eventEntityAdapter.upsertOne(state, action.payload);
		},
	},
	extraReducers: {
		[loadEventList.fulfilled.type]: (state, action: PayloadAction<Event[] | undefined>) => {
			if (!action.payload) return;
			eventEntityAdapter.upsertMany(state, action.payload);
		},
		[loadEvent.fulfilled.type]: (state, action: PayloadAction<Event>) => {
			eventEntityAdapter.upsertOne(state, action.payload);
		},
	},
});

export {
	name,
	reducer,
};

export const {
	updateSuccess,
} = actions;


/*
 * Selectors
 */
const selectSliceState = (state: RootState): EventState => state[MODULE_NAME];

export const {
	selectAll,
	selectById,
	selectIds,
	selectEntities,
	selectTotal,
} = eventEntityAdapter.getSelectors<RootState>(selectSliceState);



