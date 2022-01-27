import {LatLng} from 'leaflet';
import {IHomePageMapData} from "../../model/model.maptypes";
import {IArtist, IEvent, IHomePageData, IVenue} from "../../model/model.homepagetypes";

export function calculateDistance(x1: LatLng, x2: LatLng) {
    return Math.sqrt(Math.pow(x1.lng - x2.lng, 2) + Math.pow(x1.lat - x2.lat, 2));
}

export function transformMapDataToHomePageData(mapData: IHomePageMapData): Partial<IHomePageData> {

    if (mapData) {
        return {
            detailItem: {
                name: "",
                type: ""
            },
            artists: mapData.artists.map(artist => {
                return {
                    id: artist.id,
                    detail_id: artist.detail_id,
                    name: artist.name,
                    type: artist.type
                } as IArtist
            }),
            events: mapData.events.map(event => {
                return {
                    id: event.id,
                    detail_id: event.detail_id,
                    name: event.name,
                    type: event.type,
                    description: event.description,
                    profile: ""
                } as unknown as IEvent
            }),
            venues: mapData.venues.map(venue => {
                return {
                    id: venue.id,
                    detail_id: venue.detail_id,
                    name: venue.name,
                    type: venue.type,
                    description: venue.description,
                    profile: ""
                } as unknown as IVenue
            })
        };
    }

    return {
        detailItem: {
            name: "",
            type: ""
        }, artists: [], events: [], venues: []
    }

}
