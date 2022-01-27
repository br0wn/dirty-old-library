import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {IRelease} from '../../model/model.homepagetypes';
import {useHistory} from "react-router";
import {Button} from "react-bootstrap";
import ImageGallery from "../components/ImageGallery";
import {useParams} from 'react-router-dom';
import Container from "react-bootstrap/Container";

interface ReleaseDetailsProps {
    release: IRelease;
    fetchRelease: (id: string) => void;
}

function Release(props: ReleaseDetailsProps) {

    const history = useHistory();
    const {release, fetchRelease} = props;

    const {id} = useParams<{ id: string }>();

    useEffect(() => {

        if ((!release || !release.id) || (release.id.toString() !== id)) {
            fetchRelease(id);
        }
    }, [id, release, fetchRelease]);

    return (
        <Container className={"container"}>
            <Button className={"m-2"} variant="secondary" onClick={() => {
                history.goBack();
            }}>Back</Button>
            <div className={"content flex-container flex-container-column"}>
                <div className={"content flex-container flex-container-column"}>
                    <div className={"label"}>Release title</div>
                    <div className={"value"}>{release.releaseTitle}</div>
                </div>
                <div className={"content flex-container flex-container-row"}>
                    <div className={"content flex-container flex-container-column"}>
                        <div className={"label"}>Label</div>
                        <Button className={"m-2"} variant="outline-dark" onClick={() => {
                            if (release.label) {
                                if (release.label.id) {
                                    history.push(`/label/${release.label.id}`)
                                }
                            }
                        }
                        }>{(release.label || {}).name}</Button>
                    </div>
                    <div className={"content flex-container flex-container-column"}>
                        <div className={"label"}>Release year</div>
                        <div className={"value"}>{release.year}</div>
                    </div>
                </div>
                <div className={"content flex-container flex-container-row"}>
                    <div className={"w-50 m-3"}>
                        <ImageGallery images={[(release.profilePicture || "")]}/>
                    </div>
                    <div className={"content flex-container flex-container-column w-50 m-3"}>
                        <div className={"m-2 h2"}>General Info</div>
                        <div className={"content flex-container flex-container-column"}>
                            <div className={"label"}>Country</div>
                            <div className={"value"}>{release.country}</div>
                        </div>
                        <div className={"content flex-container flex-container-column"}>
                            <div className={"label"}>Description</div>
                            <div className={"value"}>{release.description}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>

    )
}

export default Release;
