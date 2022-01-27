import { combineReducers } from '@reduxjs/toolkit';
import * as artist from '../artist';
import * as auth from '../auth';
import * as event from '../event';
import * as label from '../label';
import * as loader from '../loader';
import * as release from '../release';
import * as track from '../track';
import * as venue from '../venue';

export const reducer = combineReducers({
	[artist.name]: artist.reducer,
	[auth.name]: auth.reducer,
	[loader.name]: loader.reducer,
	[label.name]: label.reducer,
	[venue.name]: venue.reducer,
	[release.name]: release.reducer,
	[event.name]: event.reducer,
	[track.name]: track.reducer,
});

export type RootState = ReturnType<typeof reducer>;
