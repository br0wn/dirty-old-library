import React from 'react';
import {IEvent} from '../../model/model.homepagetypes';
import {useHistory} from "react-router";

interface IEventsProps {
    events: IEvent[];
}

function ModelEvents(props: IEventsProps) {

    const history = useHistory();

    return (
        <div className={"flex-container flex-container-column"} style={{fontSize: "0.75vw"}}>
            <ul className="list-group">
                {
                    (props.events || []).map((event: IEvent, index: number) => {
                        return (
                            <li key={`event-list-${index}`} className={"list-group-item"} style={{"cursor": "pointer"}}
                                onClick={() => {
                                    history.push(`/event/${event.detail_id}`)
                                }}>
                                <div className="d-flex w-100 justify-content-between">
                                    <div className="mb-1">{event.name}</div>
                                </div>
                                <p className="mb-1">{event.description}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )

}

export default ModelEvents
