import React from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AppState} from '../../store/store';
import {fetchEventAction, HomePageActionTypes} from '../../duck/homepage/homepage.actions';
import {IEvent} from '../../model/model.homepagetypes';
import {Dispatch} from 'redux';
import {MapActionTypes} from '../../duck/map/map.actions';
import {MapDataActionTypes} from '../../duck/mapdata/mapdata.actions';
import Event from "./Event";

interface EventContainerProps {
    event: IEvent;
    fetchEvent: (id: string) => void;
}

function EventContainer(props: EventContainerProps) {

    return (
        <Event {...props}/>
    )
}

const MapStateToProps = (store: AppState) => {
    return {
        event: store.homePageData.event
    };
};

const MapDispatchToProps = (dispatch: Dispatch<HomePageActionTypes | MapActionTypes | MapDataActionTypes>) => {
    return {
        fetchEvent: (id: string) => dispatch(fetchEventAction(id)),
    }
};

export default connect(
    MapStateToProps,
    MapDispatchToProps
)(EventContainer);
