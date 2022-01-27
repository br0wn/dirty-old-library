import React from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AppState} from '../../store/store';
import {fetchReleaseAction, HomePageActionTypes} from '../../duck/homepage/homepage.actions';
import {IRelease} from '../../model/model.homepagetypes';
import {Dispatch} from 'redux';
import {MapActionTypes} from '../../duck/map/map.actions';
import {MapDataActionTypes} from '../../duck/mapdata/mapdata.actions';
import Release from "./Release";

interface ReleaseContainerProps {
    release: IRelease;
    fetchRelease: (id: string) => void;
}

function ReleaseContainer(props: ReleaseContainerProps) {

    return (
        <Release {...props}/>
    )
}

const MapStateToProps = (store: AppState) => {
    return {
        release: store.homePageData.release
    };
};

const MapDispatchToProps = (dispatch: Dispatch<HomePageActionTypes | MapActionTypes | MapDataActionTypes>) => {
    return {
        fetchRelease: (id: string) => dispatch(fetchReleaseAction(id)),
    }
};

export default connect(
    MapStateToProps,
    MapDispatchToProps
)(ReleaseContainer);
