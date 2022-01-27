import {IPosition} from '../../model/IPosition';

export const UPDATE_MAP_POSITION = 'UPDATE_MAP_POSITION';
export const UPDATE_MAP_ZOOM = 'UPDATE_MAP_ZOOM';

export interface IUpdateMapPositionAction {
    type: typeof UPDATE_MAP_POSITION,
    payload: IPosition
}

export interface IUpdateMapZoomAction {
    type: typeof UPDATE_MAP_ZOOM,
    payload: number
}

export type MapActionTypes = IUpdateMapPositionAction | IUpdateMapZoomAction

export function updateMapPositionAction(position: IPosition): IUpdateMapPositionAction {
    return {
        type: UPDATE_MAP_POSITION,
        payload: position
    }
}

export function updateMapZoomAction(zoom: number): IUpdateMapZoomAction {
    return {
        type: UPDATE_MAP_ZOOM,
        payload: zoom
    }
}
