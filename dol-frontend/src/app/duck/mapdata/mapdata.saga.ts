import {call, put, takeLatest} from 'redux-saga/effects'
import {fetchHomePageMapDataService} from '../../../api/request/homepage.service';
import {IHomePageMapData} from '../../model/model.maptypes';
import {FETCH_MAP_DATA, IFetchMapDataAction, updateMapDataAction} from './mapdata.actions';
import {updateHomePageDataAction} from "../homepage/homepage.actions";
import {transformMapDataToHomePageData} from "./mapdata.utils";

export function* fetchMapDataSaga(action: IFetchMapDataAction) {
    const mapData: IHomePageMapData = yield call(fetchHomePageMapDataService, action.position, action.bounds);
    yield put(updateMapDataAction(mapData));
    yield put(updateHomePageDataAction(transformMapDataToHomePageData(mapData)));
}

export function* mapDataSaga() {
    yield takeLatest(FETCH_MAP_DATA, fetchMapDataSaga);
}
