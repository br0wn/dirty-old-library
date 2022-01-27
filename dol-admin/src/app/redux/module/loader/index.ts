import { AnyAction, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../_root';

const MODULE_NAME = 'loader';

/*
 * State
 */
export interface LoaderState {
	global: boolean;

	[loaderName: string]: boolean,
}

/*
 * Slice
 */
const { name, reducer, actions } = createSlice({
	name: MODULE_NAME,
	initialState: {
		global: false,
	} as LoaderState,
	reducers: {
		set: (state, action: PayloadAction<{ name: string; isLoading: boolean }>) => {
			const { name, isLoading } = action.payload;
			state[name] = isLoading;
		},
		setGlobal: (state, action: PayloadAction<boolean>) => {
			state.global = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addMatcher(isLoadStartAction, ((state, action) => {
			const loaderName = getLoadActionName(action);
			state[loaderName] = true;
		}));
		builder.addMatcher(isLoadEndAction, ((state, action) => {
			const loaderName = getLoadActionName(action);
			state[loaderName] = false;
		}));
	},
});

export { name, reducer };

export const {
	set,
	setGlobal,
} = actions;

/*
 * Selectors
 */
const selectSliceState = (state: RootState): LoaderState => state[MODULE_NAME];

export const createSelectLoader = (loaderName: string) => createSelector(
	[selectSliceState],
	state => state[loaderName],
);

export const selectGlobal = createSelector(
	[selectSliceState],
	state => state.global,
);


/*
 * Helpers
 */
function isLoadStartAction(action: AnyAction) {
	return /\/pending$/.test(action.type);
}

function isLoadEndAction(action: AnyAction) {
	return /\/(rejected|fulfilled)$/.test(action.type);
}

function getLoadActionName(action: AnyAction) {
	return action.type.replace(/\/(rejected|fulfilled)$/, '/pending');
}
