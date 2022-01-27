import React from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AppState} from '../../store/store';
import {fetchArtistAction, HomePageActionTypes} from '../../duck/homepage/homepage.actions';
import {IArtist} from '../../model/model.homepagetypes';
import {Dispatch} from 'redux';
import {MapActionTypes} from '../../duck/map/map.actions';
import {MapDataActionTypes} from '../../duck/mapdata/mapdata.actions';
import Artist from "./Artist";

interface ArtistContainerProps {
    artist: IArtist;
    fetchArtist: (id: string) => void;
}

function ArtistContainer(props: ArtistContainerProps) {


    return (
        <Artist {...props}/>
    )
}

const MapStateToProps = (store: AppState) => {
    return {
        artist: store.homePageData.artist
    };
};

const MapDispatchToProps = (dispatch: Dispatch<HomePageActionTypes | MapActionTypes | MapDataActionTypes>) => {
    return {
        fetchArtist: (id: string) => dispatch(fetchArtistAction(id)),
    }
};

export default connect(
    MapStateToProps,
    MapDispatchToProps
)(ArtistContainer);
