import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {IEvent} from '../../model/model.homepagetypes';
import {useHistory} from "react-router";
import {useParams} from "react-router-dom";
import {Button} from "react-bootstrap";
import Container from "react-bootstrap/Container";

interface EventDetailsProps {
    event: IEvent;
    fetchEvent: (id: string) => void;
}

function Event(props: EventDetailsProps) {

    const history = useHistory();
    const {event, fetchEvent} = props;

    const {id} = useParams<{ id: string }>();

    useEffect(() => {

        if ((!event || !event.id) || (event.id.toString() !== id)) {
            fetchEvent(id);
        }
    }, [id, event, fetchEvent]);

    return (
        <Container className={"container"}>
            <Button className={"m-2"} variant="secondary" onClick={() => {
                history.goBack();
            }}>Back</Button>
            <div className={"content flex-container flex-container-column"}>
                <div className={"content flex-container flex-container-row"}>
                    <div className={"label"}>{event.name}</div>
                </div>
                <div className={"w-150 m-2"}>
                    <div className={"label"}>Location</div>
                    <div className={"value"}>{event.location}</div>
                </div>
                <div className={"w-150 m-2"}>
                    <div className={"label"}>About the event</div>
                    <div className={"value"}>{event.about}</div>
                </div>
                <div className={"w-150 m-2"}>
                    <div className={"label"}>Performers</div>
                    <div className={"value"}>{event.performers}</div>
                </div>
                <div className={"w-150 m-2"}>
                    <div className={"label"}>Filler info</div>
                    <div className={"value"}>{event.infoAboutTickets}</div>
                </div>
                <div className={"w-150 m-2"}>
                    <div className={"label"}>Extra info</div>
                    <div className={"value"}>{event.freeText}</div>
                </div>
                <div className={"w-150 m-2"}>
                    <div className={"label"}>Other info</div>
                    <div className={"value"}>{event.shortDescription}</div>
                </div>
            </div>
        </Container>
    )
}

export default Event;
