import { createAsyncThunk, createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
import { Release } from '../../../../api/model/release';
import { getRelease } from '../../../../api/sdk/release/get.release';
import { getReleaseList } from '../../../../api/sdk/release/get.release.list';
import { RootState } from '../_root';

const MODULE_NAME = 'release';

/*
 * State
 */
export interface ReleaseState extends EntityState<Release> {
	loadedAt?: string
}

/*
 * Async Actions
 */
export const loadReleaseList = createAsyncThunk(
	MODULE_NAME + '/load',
	async (options: { force?: boolean } | undefined, thunkAPI) => {
		const state = thunkAPI.getState() as RootState;
		const sliceState = selectSliceState(state);

		if (!(options?.force) && sliceState.ids.length > 0 && !!sliceState.loadedAt) {
			return undefined;
		}

		const result = await getReleaseList({});
		return result.itemList;
	},
);

export const loadRelease = createAsyncThunk(
	MODULE_NAME + '/load-one',
	async (id: string) => {
		return await getRelease(id);
	},
);


/*
 * Entity Adapter
 */
const releaseEntityAdapter = createEntityAdapter<Release>({
	selectId: model => model.id!,
});


/*
 * Slice
 */
const { name, reducer, actions } = createSlice({
	name: MODULE_NAME,
	initialState: releaseEntityAdapter.getInitialState({
		loadedAt: undefined,
	} as ReleaseState),
	reducers: {
		updateSuccess: (state, action: PayloadAction<Release>) => {
			releaseEntityAdapter.upsertOne(state, action.payload);
		},
	},
	extraReducers: {
		[loadReleaseList.fulfilled.type]: (state, action: PayloadAction<Release[] | undefined>) => {
			if (!action.payload) return;
			releaseEntityAdapter.upsertMany(state, action.payload);
			state.loadedAt = (new Date()).toISOString();
		},
		[loadRelease.fulfilled.type]: (state, action: PayloadAction<Release>) => {
			releaseEntityAdapter.upsertOne(state, action.payload);
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
const selectSliceState = (state: RootState): ReleaseState => state[MODULE_NAME];

export const {
	selectAll,
	selectById,
	selectIds,
	selectEntities,
	selectTotal,
} = releaseEntityAdapter.getSelectors<RootState>(selectSliceState);



