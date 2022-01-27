import { createAsyncThunk, createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
import { Track } from '../../../../api/model/track';
import { getTrack } from '../../../../api/sdk/track/get.track';
import { getTrackList } from '../../../../api/sdk/track/get.track.list';
import { RootState } from '../_root';

const MODULE_NAME = 'track';

/*
 * State
 */
export interface TrackState extends EntityState<Track> {
	loadedAt?: string
}

/*
 * Async Actions
 */
export const loadTrackList = createAsyncThunk(
	MODULE_NAME + '/load',
	async (options: { force?: boolean } | void, thunkAPI) => {
		const state = thunkAPI.getState() as RootState;
		const sliceState = selectSliceState(state);

		if (!(!!options && options.force) && sliceState.ids.length > 0) {
			return undefined;
		}

		return await getTrackList({});
	},
);

export const loadTrack = createAsyncThunk(
	MODULE_NAME + '/load-one',
	async (id: string) => {
		return await getTrack(id);
	},
);


/*
 * Entity Adapter
 */
const trackEntityAdapter = createEntityAdapter<Track>({
	selectId: model => model.id!,
});


/*
 * Slice
 */
const { name, reducer, actions } = createSlice({
	name: MODULE_NAME,
	initialState: trackEntityAdapter.getInitialState({
		loadedAt: undefined,
	}),
	reducers: {
		updateSuccess: (state, action: PayloadAction<Track>) => {
			trackEntityAdapter.upsertOne(state, action.payload);
		},
	},
	extraReducers: {
		[loadTrackList.fulfilled.type]: (state, action: PayloadAction<Track[] | undefined>) => {
			if (!action.payload) return;
			trackEntityAdapter.upsertMany(state, action.payload);
		},
		[loadTrack.fulfilled.type]: (state, action: PayloadAction<Track>) => {
			trackEntityAdapter.upsertOne(state, action.payload);
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
const selectSliceState = (state: RootState): TrackState => state[MODULE_NAME];

export const {
	selectAll,
	selectById,
	selectIds,
	selectEntities,
	selectTotal,
} = trackEntityAdapter.getSelectors<RootState>(selectSliceState);



