import {applyMiddleware, combineReducers, createStore} from 'redux';
import {homepageReducer} from '../duck/homepage/homepage.reducer';

import createSagaMiddleware from 'redux-saga';
import {homepageSaga} from '../duck/homepage/homepage.saga';
import {mapReducer} from '../duck/map/map.reducer';
import {mapDataReducer} from '../duck/mapdata/mapdata.reducer';
import {mapDataSaga} from '../duck/mapdata/mapdata.saga';

const rootReducer = combineReducers({
    homePageData: homepageReducer,
    mapData: mapDataReducer,
    mapPosition: mapReducer
});

export type AppState = ReturnType<typeof rootReducer>;
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(homepageSaga);
sagaMiddleware.run(mapDataSaga);


