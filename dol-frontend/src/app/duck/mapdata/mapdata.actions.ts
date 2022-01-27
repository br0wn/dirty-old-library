import {IHomePageMapData} from '../../model/model.maptypes';
import {IPosition} from '../../model/IPosition';
import { LatLngBounds } from 'leaflet';

export const FETCH_MAP_DATA = 'FETCH_MAP_DATA';
export const UPDATE_MAP_DATA = 'UPDATE_MAP_DATA';

export interface IFetchMapDataAction {
    type: typeof FETCH_MAP_DATA;
    position: IPosition;
    bounds: LatLngBounds;
}

interface IUpdateMapDataAction {
    type: typeof UPDATE_MAP_DATA;
    payload: IHomePageMapData;
}

export type MapDataActionTypes =
    IFetchMapDataAction
    | IUpdateMapDataAction

export function fetchMapDataAction(position: IPosition, bounds: LatLngBounds): IFetchMapDataAction {
    return {
        type: FETCH_MAP_DATA,
        position: position,
        bounds: bounds
    }
}

export function updateMapDataAction(mapData: IHomePageMapData): IUpdateMapDataAction {
    return {
        type: UPDATE_MAP_DATA,
        payload: mapData
    }
}
