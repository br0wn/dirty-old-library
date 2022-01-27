import React from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AppState} from '../../store/store';
import {fetchLabelAction, HomePageActionTypes} from '../../duck/homepage/homepage.actions';
import {ILabel} from '../../model/model.homepagetypes';
import {Dispatch} from 'redux';
import {MapActionTypes} from '../../duck/map/map.actions';
import {MapDataActionTypes} from '../../duck/mapdata/mapdata.actions';
import Label from "./Label";

interface LabelContainerProps {
    label: ILabel;
    fetchLabel: (id: string) => void;
}

function LabelContainer(props: LabelContainerProps) {

    return (
        <Label {...props}/>
    )
}

const MapStateToProps = (store: AppState) => {
    return {
        label: store.homePageData.label
    };
};

const MapDispatchToProps = (dispatch: Dispatch<HomePageActionTypes | MapActionTypes | MapDataActionTypes>) => {
    return {
        fetchLabel: (id: string) => dispatch(fetchLabelAction(id)),
    }
};

export default connect(
    MapStateToProps,
    MapDispatchToProps
)(LabelContainer);
