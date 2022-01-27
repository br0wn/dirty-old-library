import {MapDataActionTypes, UPDATE_MAP_DATA} from './mapdata.actions';
import {IHomePageMapData} from '../../model/model.maptypes';

const initialState: IHomePageMapData = {
    events: [],
    artists: [],
    venues: []
};

export function mapDataReducer(state = initialState, action: MapDataActionTypes): IHomePageMapData {
    switch (action.type) {
        case UPDATE_MAP_DATA:
            return {...action.payload};
        default:
            return state
    }
}
