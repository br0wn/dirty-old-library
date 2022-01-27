import { createAsyncThunk, createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
import { Artist } from '../../../../api/model/artist';
import { getArtist } from '../../../../api/sdk/artist/get.artist';
import { getArtistList } from '../../../../api/sdk/artist/get.artist.list';
import { RootState } from '../_root';

const MODULE_NAME = 'artist';

/*
 * State
 */
export interface ArtistState extends EntityState<Artist> {
	loadedAt?: string
}

/*
 * Async Actions
 */
export const loadArtistList = createAsyncThunk(
	MODULE_NAME + '/load-list',
	async (options: { force?: boolean } | undefined, thunkAPI) => {
		const state = thunkAPI.getState() as RootState;
		const sliceState = selectSliceState(state);

		if (!(options?.force) && sliceState.ids.length > 0 && !!sliceState.loadedAt) {
			return undefined;
		}

		return await getArtistList({});
	},
);

export const loadArtist = createAsyncThunk(
	MODULE_NAME + '/load-one',
	async (id: string) => {
		return await getArtist(id);
	},
);


/*
 * Entity Adapter
 */
const artistEntityAdapter = createEntityAdapter<Artist>({
	selectId: model => model.id!,
});


/*
 * Slice
 */
const { name, reducer, actions } = createSlice({
	name: MODULE_NAME,
	initialState: artistEntityAdapter.getInitialState({
		loadedAt: undefined,
	}) as ArtistState,
	reducers: {
		updateSuccess: (state, action: PayloadAction<Artist>) => {
			artistEntityAdapter.upsertOne(state, action.payload);
		},
	},
	extraReducers: {
		[loadArtistList.fulfilled.type]: (state, action: PayloadAction<Artist[] | undefined>) => {
			if (!action.payload) return;
			artistEntityAdapter.upsertMany(state, action.payload);
			state.loadedAt = (new Date()).toISOString();
		},
		[loadArtist.fulfilled.type]: (state, action: PayloadAction<Artist>) => {
			artistEntityAdapter.upsertOne(state, action.payload);
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
const selectSliceState = (state: RootState): ArtistState => state[MODULE_NAME];

export const {
	selectAll,
	selectById,
	selectIds,
	selectEntities,
	selectTotal,
} = artistEntityAdapter.getSelectors<RootState>(selectSliceState);



