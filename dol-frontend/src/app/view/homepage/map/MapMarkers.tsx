import React from 'react';
import {ARTISTS, EVENTS, POINTERS, VENUES} from '../../../model/model.homepagetypes';
import {Marker, Popup} from 'react-leaflet';
import {IArtistMap, IEventMap, IHomePageMapData, IVenueMap} from '../../../model/model.maptypes';
import MarkerClusterGroup from 'react-leaflet-markercluster';

interface IHomePageMapProps {
    mapData: IHomePageMapData;
    selectedItemTypes: string[];
    zoom: number;
}

function MapMarkers(props: IHomePageMapProps) {

    function renderItems(mapData: IHomePageMapData, type: (typeof VENUES | typeof ARTISTS | typeof EVENTS)) {
        if (props.selectedItemTypes.includes(type)) {

            let data: (IVenueMap | IArtistMap | IEventMap)[];

            if (mapData[type] && Array.isArray(mapData[type])) {
                data = mapData[type];
            } else {
                data = [];
            }

            const pointer = POINTERS[type];
            return (
                <MarkerClusterGroup>
                    {
                        data.map((item: (IVenueMap | IArtistMap | IEventMap), itemIndex: number) => {
                            return (
                                <Marker position={[item.latitude, item.longitude]} icon={pointer}
                                        key={`map-item-${type}-${itemIndex}`}>
                                    <Popup>
                                        <div>
                                            <b>{item.name}</b>
                                        </div>
                                    </Popup>
                                </Marker>
                            )
                        })
                    }
                </MarkerClusterGroup>
            )
        }

    }

    return (
        <div>
            {renderItems(props.mapData, VENUES)}
            {renderItems(props.mapData, ARTISTS)}
            {renderItems(props.mapData, EVENTS)}
        </div>

    )
}

export default MapMarkers
