import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthInfo, AuthSession } from '../../../../api/model/auth';
import { User } from '../../../../api/model/user';
import { RootState } from '../_root';

const MODULE_NAME = 'auth';

/*
 * State
 */
export interface AuthState {
	user?: User
}

/*
 * Slice
 */
const { name, reducer, actions } = createSlice({
	name: MODULE_NAME,
	initialState: {
		user: createDummyUser(),
	} as AuthState,
	reducers: {
		authSuccess: (state, action: PayloadAction<AuthSession | AuthInfo>) => {
			state.user = action.payload.user;
		},
		logoutSuccess: state => {
			state.user = undefined;
		},
	},
	extraReducers: {},
});

export { name, reducer };

export const {
	authSuccess,
	logoutSuccess,
} = actions;


/*
 * Selectors
 */
const selectSliceState = (state: RootState): AuthState => state[MODULE_NAME];

export const selectAuthUser = createSelector(
	[selectSliceState],
	state => state.user,
);


/*
 * Helpers
 */
function createDummyUser(): User {
	return {
		id: '1',
		email: 'user1@app.com',
		firstName: 'John',
		lastName: 'Doe',
	};
}
