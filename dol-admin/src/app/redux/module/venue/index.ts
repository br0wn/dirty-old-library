import { createAsyncThunk, createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
import { Venue } from '../../../../api/model/venue';
import { getVenue } from '../../../../api/sdk/venue/get.venue';
import { getVenueList } from '../../../../api/sdk/venue/get.venue.list';
import { RootState } from '../_root';

const MODULE_NAME = 'venue';

/*
 * State
 */
export interface VenueState extends EntityState<Venue> {
	loadedAt?: string
}

/*
 * Async Actions
 */
export const loadVenueList = createAsyncThunk(
	MODULE_NAME + '/load',
	async (options: { force?: boolean } | void, thunkAPI) => {
		const state = thunkAPI.getState() as RootState;
		const sliceState = selectSliceState(state);

		if (!(!!options && options.force) && sliceState.ids.length > 0) {
			return undefined;
		}

		return await getVenueList({});
	},
);

export const loadVenue = createAsyncThunk(
	MODULE_NAME + '/load-one',
	async (id: string) => {
		return await getVenue(id);
	},
);


/*
 * Entity Adapter
 */
const venueEntityAdapter = createEntityAdapter<Venue>({
	selectId: model => model.id!,
});


/*
 * Slice
 */
const { name, reducer, actions } = createSlice({
	name: MODULE_NAME,
	initialState: venueEntityAdapter.getInitialState({
		loadedAt: undefined,
	}),
	reducers: {
		updateSuccess: (state, action: PayloadAction<Venue>) => {
			venueEntityAdapter.upsertOne(state, action.payload);
		},
	},
	extraReducers: {
		[loadVenueList.fulfilled.type]: (state, action: PayloadAction<Venue[] | undefined>) => {
			if (!action.payload) return;
			venueEntityAdapter.upsertMany(state, action.payload);
		},
		[loadVenue.fulfilled.type]: (state, action: PayloadAction<Venue>) => {
			venueEntityAdapter.upsertOne(state, action.payload);
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
const selectSliceState = (state: RootState): VenueState => state[MODULE_NAME];

export const {
	selectAll,
	selectById,
	selectIds,
	selectEntities,
	selectTotal,
} = venueEntityAdapter.getSelectors<RootState>(selectSliceState);



