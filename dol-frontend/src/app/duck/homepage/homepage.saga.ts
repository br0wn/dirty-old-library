import {call, put, select, takeLatest} from 'redux-saga/effects'
import {
    FETCH_ARTIST, FETCH_EVENT,
    FETCH_HOMEPAGE_DATA,
    FETCH_LABEL,
    FETCH_RELEASE, FETCH_VENUE,
    IFetchArtistAction, IFetchEventAction,
    IFetchHomePageDataAction,
    IFetchLabelAction,
    IFetchReleaseAction, IFetchVenueAction,
    IUpdateDetailsAction,
    UPDATE_DETAILS,
    updateArtistAction, updateEventAction,
    updateHomePageDataAction,
    updateLabelAction,
    updateReleaseAction, updateVenueAction
} from './homepage.actions';
import {IArtist, IEvent, IHomePageData, ILabel, IRelease, IVenue} from '../../model/model.homepagetypes';
import {fetchHomePageDataService, getItemDetailsService} from '../../../api/request/homepage.service';
import {updateMapPositionAction} from '../map/map.actions';
import {IPositionable} from '../../model/IPositionable';
import {IArtistMap, IEventMap, IVenueMap} from '../../model/model.maptypes';
import {IDataItem} from "../../model/IDataItem";

export function* fetchHomePageDataSaga(action: IFetchHomePageDataAction) {
    const homePageData: IHomePageData = yield call(fetchHomePageDataService, action.payload);
    yield put(updateHomePageDataAction(homePageData));
}

export function* updateDetailsSaga(action: IUpdateDetailsAction) {
    const state = yield select();
    const itemPosition: (IPositionable | undefined) =
        [...state.mapData.events, ...state.mapData.artists, ...state.mapData.venues]
            .find((item: IEventMap | IVenueMap | IArtistMap) => {
                return item.id === action.payload.id;
            });
    if (itemPosition) {
        yield put(updateMapPositionAction(itemPosition.position));
    }
}

export function* fetchReleaseSaga(action: IFetchReleaseAction) {

    const id: string = action.payload;
    const item: (IDataItem) = yield call(getItemDetailsService, id, 'release');
    yield put(updateReleaseAction(item as IRelease));

}

export function* fetchLabelSaga(action: IFetchLabelAction) {

    const id: string = action.payload;
    const label: (IDataItem) = yield call(getItemDetailsService, id, 'label');
    yield put(updateLabelAction(label as ILabel));
}

export function* fetchArtistSaga(action: IFetchArtistAction) {

    const id: string = action.payload;
    const artist: (IDataItem) = yield call(getItemDetailsService, id, 'artist');
    yield put(updateArtistAction(artist as IArtist));
}


export function* fetchEventSaga(action: IFetchEventAction) {

    const id: string = action.payload;
    const event: (IDataItem) = yield call(getItemDetailsService, id, 'event');
    yield put(updateEventAction(event as IEvent));
}


export function* fetchVenueSaga(action: IFetchVenueAction) {

    const id: string = action.payload;
    const venue: (IDataItem) = yield call(getItemDetailsService, id, 'venue');
    yield put(updateVenueAction(venue as IVenue));
}

export function* homepageSaga() {
    yield takeLatest(FETCH_HOMEPAGE_DATA, fetchHomePageDataSaga);
    yield takeLatest(UPDATE_DETAILS, updateDetailsSaga);
    yield takeLatest(FETCH_RELEASE, fetchReleaseSaga);
    yield takeLatest(FETCH_LABEL, fetchLabelSaga);
    yield takeLatest(FETCH_ARTIST, fetchArtistSaga);
    yield takeLatest(FETCH_EVENT, fetchEventSaga);
    yield takeLatest(FETCH_VENUE, fetchVenueSaga);
}
