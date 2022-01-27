import {IPositionable} from './IPositionable';
import {IDataItem} from './IDataItem';
import {IPosition} from './IPosition';

export interface IEventMap extends IDataItem, IPositionable {
}

export interface IArtistMap extends IDataItem, IPositionable {
}

export interface IVenueMap extends IDataItem, IPositionable {
}

export interface IHomePageMapData {
    position?: IPosition;
    events: IEventMap[];
    artists: IArtistMap[];
    venues: IVenueMap[];
}

export interface IMapHeat extends IPositionable, IMapItems {}

export interface IMapItems {
    events: IEventMap[];
    artists: IArtistMap[];
    venues: IVenueMap[];
}

