import { configureStore } from '@reduxjs/toolkit';
import * as _root from '../module/_root';


export function createStore() {
	return configureStore({
		reducer: _root.reducer,
	});
}
