import {MapActionTypes, UPDATE_MAP_POSITION, UPDATE_MAP_ZOOM} from './map.actions';
import {IPosition} from '../../model/IPosition';

const initialState: IPosition = {lat: 0, lng: 0, zoom: 10};

export function mapReducer(state = initialState, action: MapActionTypes): IPosition {
    switch (action.type) {
        case UPDATE_MAP_POSITION:
            return {...state, ...action.payload};
        case UPDATE_MAP_ZOOM:
            return {...state, zoom: action.payload};
        default:
            return state
    }
}
