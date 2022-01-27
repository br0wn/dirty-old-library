import {IHomePageMapData} from '../../app/model/model.maptypes';
import {IPosition} from '../../app/model/IPosition';
import {IArtist, IEvent, IHomePageItems, ILabel, IVenue} from '../../app/model/model.homepagetypes';
import {LatLngBounds} from 'leaflet';
import {AxiosResponse} from 'axios';

const axios = require('axios');

export const HOST = process.env.REACT_APP_API_HOST;

export function fetchHomePageDataService(searchInput: string): Promise<IHomePageItems> {

    return axios.get(`${HOST}/homepage/getHomePageData/${searchInput}`)
        .then(function (response: AxiosResponse<IHomePageItems>) {
            return response.data;
        }).catch(function (error: any) {
            return {};
        });
}

export function getItemDetailsService(itemId: string, itemType: string): Promise<IArtist | IVenue | IEvent | ILabel> {

    return axios.get(`${HOST}/homepage/getHomeItemDetails/${itemType}/${itemId}`)
        .then(function (response: AxiosResponse<(string)>) {
            return JSON.parse(response.data);
        }).catch(function (error: any) {
            return {};
        });
}

export function fetchHomePageMapDataService(position: IPosition, bounds: LatLngBounds): Promise<IHomePageMapData> {

    const swLat: number = bounds.getSouthWest().lat;
    const swLng: number = bounds.getSouthWest().lng;
    const neLat: number = bounds.getNorthEast().lat;
    const neLng: number = bounds.getNorthEast().lng;

    const searchAreaUrl = `${HOST}/homepage/map/getHomePageMapData?swLat=${swLat}&swLng=${swLng}&neLat=${neLat}&neLng=${neLng}`;
    return axios.get(searchAreaUrl)
        .then(function (response: AxiosResponse<(IEvent | IArtist | IVenue)[]>) {
            return {
                'events': response.data.filter((d) => d.type === 'event'),
                'venues': response.data.filter((d) => d.type === 'venue'),
                'artists': response.data.filter((d) => d.type === 'artist'),
            };
        }).catch(function (error: any) {
            return {};
        });
}
