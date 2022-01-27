import React, {useCallback} from 'react';
import {connect} from 'react-redux';
import HomePage from './HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AppState} from '../../store/store';
import {fetchHomePageDataAction, HomePageActionTypes} from '../../duck/homepage/homepage.actions';
import {IHomePageData} from '../../model/model.homepagetypes';
import {Dispatch} from 'redux';
import {MapActionTypes, updateMapPositionAction, updateMapZoomAction} from '../../duck/map/map.actions';
import {IHomePageMapData} from '../../model/model.maptypes';
import {fetchMapDataAction, MapDataActionTypes} from '../../duck/mapdata/mapdata.actions';
import {IPosition} from '../../model/IPosition';
import {LatLngBounds} from 'leaflet';

interface IHomePageContainerProps {
    homePageData: IHomePageData;
    mapData: IHomePageMapData;
    mapPosition: IPosition,
    fetchHomePageData: (searchInput: string) => void;
    fetchHomePageMapData: (position: IPosition, bounds: LatLngBounds) => void;
    updateMapPosition: (position: IPosition) => void;
    updateMapZoom: (zoom: number) => void;
}

function HomePageContainer(props: IHomePageContainerProps) {

    const {updateMapPosition} = props;

    const getUserPosition = useCallback(() => {
        navigator.geolocation.getCurrentPosition(inputPosition => {
            const position = {lat: inputPosition.coords.latitude, lng: inputPosition.coords.longitude};
            updateMapPosition(position);
        });
    }, [updateMapPosition]);

    getUserPosition();

    return (
        <HomePage {...props}/>
    )
}

const MapStateToProps = (store: AppState) => {
    return {
        homePageData: store.homePageData,
        mapData: store.mapData,
        mapPosition: store.mapPosition
    };
};

const MapDispatchToProps = (dispatch: Dispatch<HomePageActionTypes | MapActionTypes | MapDataActionTypes>) => {
    return {
        fetchHomePageData: (searchInput: string) => {
            dispatch(fetchHomePageDataAction(searchInput));
        },
        fetchHomePageMapData: (position: IPosition, bounds: LatLngBounds) => {
            dispatch(fetchMapDataAction(position, bounds));
        },
        updateMapPosition: (position: IPosition) => dispatch(updateMapPositionAction(position)),
        updateMapZoom: (zoom: number) => {
            dispatch(updateMapZoomAction(zoom))
        },
    }
};

export default connect(
    MapStateToProps,
    MapDispatchToProps
)(HomePageContainer);
