import React from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AppState} from '../../store/store';
import {fetchVenueAction, HomePageActionTypes} from '../../duck/homepage/homepage.actions';
import {IVenue} from '../../model/model.homepagetypes';
import {Dispatch} from 'redux';
import {MapActionTypes} from '../../duck/map/map.actions';
import {MapDataActionTypes} from '../../duck/mapdata/mapdata.actions';
import Venue from "./Venue";

interface VenueContainerProps {
    venue: IVenue;
    fetchVenue: (id: string) => void;
}

function VenueContainer(props: VenueContainerProps) {

    return (
        <Venue {...props}/>
    )
}

const MapStateToProps = (store: AppState) => {
    return {
        venue: store.homePageData.venue
    };
};

const MapDispatchToProps = (dispatch: Dispatch<HomePageActionTypes | MapActionTypes | MapDataActionTypes>) => {
    return {
        fetchVenue: (id: string) => dispatch(fetchVenueAction(id)),
    }
};

export default connect(
    MapStateToProps,
    MapDispatchToProps
)(VenueContainer);
