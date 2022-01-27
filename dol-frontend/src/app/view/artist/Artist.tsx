import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {IArtist} from '../../model/model.homepagetypes';
import ImageGallery from "../components/ImageGallery";
import ReleaseTable from "../components/ReleaseTable";
import {useHistory} from "react-router";
import {useParams} from "react-router-dom";
import {Button} from "react-bootstrap";
import Container from "react-bootstrap/Container";

interface ArtistDetailsProps {
    artist: IArtist;
    fetchArtist: (id: string) => void;
}

function Artist(props: ArtistDetailsProps) {

    const history = useHistory();
    const {artist, fetchArtist} = props;

    const {id} = useParams<{ id: string }>();

    useEffect(() => {

        if ((!artist || !artist.id) || (artist.id.toString() !== id)) {
            fetchArtist(id);
        }
    }, [id, artist, fetchArtist]);

    return (
        <Container className={"container"}>
            <Button className={"m-2"} variant="secondary" onClick={() => {
                history.goBack();
            }}>Back</Button>
            <div className={"content flex-container flex-container-column"}>
                <div className={"w-150 m-2"}>
                    <div className={"label"}>Description</div>
                    <div className={"value"}>{artist.summary}</div>
                </div>
                <div className={"w-150 m-2"}>
                    <div className={"label"}>Info</div>
                    <div className={"value"}>{artist.info}</div>
                </div>
                <div className={"content flex-container flex-container-row"}>
                    <div className={"w-50 m-3"}>
                        <ImageGallery images={(artist.artistImages || []).map(image => image.image)}/>
                    </div>
                    <div className={"content flex-container flex-container-column w-50 m-3"}>
                        <div className={"m-2 h2"}>General Info</div>
                        <div className={"content flex-container flex-container-column"}>
                            <div className={"label"}>Place of origin (country, city)</div>
                            <div className={"value"}>{artist.place}</div>
                        </div>
                        <div className={"content flex-container flex-container-column"}>
                            <div className={"label"}>{artist.group ? "Group" : "Members"}</div>
                            {(artist.group) ? <div className={"value"}>{artist.group}</div> :
                                (artist.members || []).map((member: IArtist) => {
                                    return (
                                        <div className={"value"} onClick={() => {
                                            history.push(`/artist/${member.id}`)
                                        }
                                        }>{member.name}</div>
                                    )
                                })}
                        </div>
                        <div className={"content flex-container flex-container-column"}>
                            <div className={"label"}>Year when they began</div>
                            <div className={"value"}>{artist.startYear}</div>
                        </div>
                        <div className={"content flex-container flex-container-column"}>
                            <div className={"label"}>Genre, style</div>
                            <div className={"value"}>{artist.genre} {artist.style}</div>
                        </div>
                        <div className={"content flex-container flex-container-column"}>
                            <div className={"label"}>Artist page</div>
                            <div className={"value"}>
                                <a target={"_blank"} href={artist.link}>{artist.link}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"card"}>
                    <div className={"m-2 h2 text-center"}>Discography</div>
                    <ReleaseTable releases={artist.releases}/>
                </div>
            </div>
        </Container>
    )
}

export default Artist;
