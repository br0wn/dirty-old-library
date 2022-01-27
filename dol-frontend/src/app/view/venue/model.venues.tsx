import React from 'react';
import {IVenue} from '../../model/model.homepagetypes';
import {useHistory} from "react-router";

interface IVenuesProps {
    venues: IVenue[];
}

function ModelVenues(props: IVenuesProps) {

    const history = useHistory();

    return (
        <div className={"flex-container flex-container-column"} style={{fontSize: "0.75vw"}}>
            <ul className="list-group">
                {
                    (props.venues || []).map((venue: IVenue, index: number) => {
                        return (
                            <li key={`venue-list-${index}`} className={"list-group-item"} style={{"cursor": "pointer"}}
                                onClick={() => {
                                    history.push(`/venue/${venue.detail_id}`)
                                }}>
                                <div className="d-flex w-100 justify-content-between">
                                    <div className="mb-1">{venue.name}</div>
                                </div>
                                <p className="mb-1">{venue.description}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )


}

export default ModelVenues
