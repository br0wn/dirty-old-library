import {ARTISTS, EVENTS, IHomePageData, VENUES} from '../../model/model.homepagetypes';
import React from 'react';
import ModelEvents from '../event/model.events';
import ModelArtists from '../artist/model.artists';
import ModelVenues from '../venue/model.venues';

interface HomePageItemsProps {
    homePageData: IHomePageData;
    selectedItemTypes: string[];
}

function HomePageItems(props: HomePageItemsProps) {

    function renderEvents() {
        if (props.selectedItemTypes.includes(EVENTS)) {
            return <ModelEvents events={props.homePageData.events}/>
        }
    }

    function renderArtists() {
        if (props.selectedItemTypes.includes(ARTISTS)) {
            return <ModelArtists artists={props.homePageData.artists}/>
        }
    }

    function renderVenues() {
        if (props.selectedItemTypes.includes(VENUES)) {
            return <ModelVenues venues={props.homePageData.venues}/>
        }
    }

    return (
        <div className={"content flex-container flex-container-column"}>
            {renderEvents()}
            {renderArtists()}
            {renderVenues()}
        </div>
    )

}

export default HomePageItems;
