import { createAsyncThunk, createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
import { Label } from '../../../../api/model/label';
import { getLabel } from '../../../../api/sdk/label/get.label';
import { getLabelList } from '../../../../api/sdk/label/get.label.list';
import { RootState } from '../_root';

const MODULE_NAME = 'label';

/*
 * State
 */
export interface LabelState extends EntityState<Label> {
	loadedAt?: string
}

/*
 * Async Actions
 */
export const loadLabelList = createAsyncThunk(
	MODULE_NAME + '/load',
	async (options: { force?: boolean } | undefined, thunkAPI) => {
		const state = thunkAPI.getState() as RootState;
		const sliceState = selectSliceState(state);

		if (!(options?.force) && sliceState.ids.length > 0 && !!sliceState.loadedAt) {
			return undefined;
		}

		return await getLabelList({});
	},
);

export const loadLabel = createAsyncThunk(
	MODULE_NAME + '/load-one',
	async (id: string) => {
		return await getLabel(id);
	},
);


/*
 * Entity Adapter
 */
const labelEntityAdapter = createEntityAdapter<Label>({
	selectId: model => model.id!,
});


/*
 * Slice
 */
const { name, reducer, actions } = createSlice({
	name: MODULE_NAME,
	initialState: labelEntityAdapter.getInitialState({
		loadedAt: undefined,
	} as LabelState),
	reducers: {
		updateSuccess: (state, action: PayloadAction<Label>) => {
			labelEntityAdapter.upsertOne(state, action.payload);
		},
	},
	extraReducers: {
		[loadLabelList.fulfilled.type]: (state, action: PayloadAction<Label[] | undefined>) => {
			if (!action.payload) return;
			labelEntityAdapter.upsertMany(state, action.payload);
			state.loadedAt = (new Date()).toISOString();
		},
		[loadLabel.fulfilled.type]: (state, action: PayloadAction<Label>) => {
			labelEntityAdapter.upsertOne(state, action.payload);
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
const selectSliceState = (state: RootState): LabelState => state[MODULE_NAME];

export const {
	selectAll,
	selectById,
	selectIds,
	selectEntities,
	selectTotal,
} = labelEntityAdapter.getSelectors<RootState>(selectSliceState);



