import React from 'react';
import {Map as LeafletMap, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.css';
import MapMarkers from './MapMarkers';
import {LatLng, LatLngBounds, LeafletEvent, LeafletMouseEvent} from 'leaflet';
import {IHomePageMapData} from '../../../model/model.maptypes';
import './Map.css';
import {IPosition} from '../../../model/IPosition';

interface IHomePageMapProps {
    mapData: IHomePageMapData,
    mapPosition: IPosition,
    updateMapPosition: (position: IPosition) => void,
    updateMapZoom: (zoom: number) => void,
    fetchHomePageMapData: (position: IPosition, bounds: LatLngBounds) => void;
    selectedItemTypes: string[],
}

function Map(props: IHomePageMapProps) {


    const zoom = props.mapPosition.zoom || 10;

    return (
        <div id="map_holder">
            <LeafletMap center={[props.mapPosition.lat, props.mapPosition.lng]} zoom={zoom} maxZoom={18}
                        className={'markercluster-map'}
                        onmoveend={(e: LeafletMouseEvent) => {
                            const center: LatLng = e.target.getCenter();
                            const {lat} = center;
                            const {lng} = center;

                            props.updateMapPosition({lat: lat, lng: lng});

                            const bound: LatLngBounds = e.target.getBounds();

                            props.fetchHomePageMapData(center, bound);
                        }}
                        onzoomend={(e: LeafletEvent) => {
                            props.updateMapZoom(e.target.getZoom());
                        }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapMarkers mapData={props.mapData} selectedItemTypes={props.selectedItemTypes} zoom={zoom}/>
            </LeafletMap>
        </div>
    );

}

export default Map;
