import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {IVenue} from '../../model/model.homepagetypes';
import {useHistory} from "react-router";
import {useParams} from "react-router-dom";
import {Button} from "react-bootstrap";
import ImageGallery from "../components/ImageGallery";
import Container from "react-bootstrap/Container";

interface VenueDetailsProps {
    venue: IVenue;
    fetchVenue: (id: string) => void;
}

function Venue(props: VenueDetailsProps) {

    const history = useHistory();
    const {venue, fetchVenue} = props;

    const {id} = useParams<{ id: string }>();

    useEffect(() => {

        if ((!venue || !venue.id) || (venue.id.toString() !== id)) {
            fetchVenue(id);
        }
    }, [id, venue, fetchVenue]);

    return (
        <Container className={"container"}>
            <Button className={"m-2"} variant="secondary" onClick={() => {
                history.goBack();
            }}>Back</Button>
            <div className={"content flex-container flex-container-column"}>
                <div className={"content flex-container flex-container-row h2"}>
                    <div className={"name"}>{venue.name}</div>
                </div>
                <div className={"content flex-container flex-container-row"}>
                    <ImageGallery images={[venue.profilePicture]}/>
                </div>
                <div className={"content flex-container flex-container-row"}>
                    <div className={"label"}>Address</div>
                    <div className={"value"}>{venue.location}</div>
                </div>
                <div className={"content flex-container flex-container-row"}>
                <div className={"label"}>About</div>
                <div className={"value"}>{venue.about}</div>
                </div>
                <div className={"content flex-container flex-container-row"}>
                <div className={"label"}>Description</div>
                <div className={"value"}>{venue.shortDescription}</div>
                </div>
            </div>
        </Container>
    )
}

export default Venue;
