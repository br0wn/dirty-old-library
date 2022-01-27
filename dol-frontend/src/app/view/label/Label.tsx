import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ILabel} from '../../model/model.homepagetypes';
import {useHistory} from "react-router";
import {Button} from "react-bootstrap";
import ReleaseTable from "../components/ReleaseTable";
import {useParams} from "react-router-dom";
import Container from "react-bootstrap/Container";

interface LabelDetailsProps {
    label: ILabel;
    fetchLabel: (id: string) => void;

}

function Label(props: LabelDetailsProps) {

    const history = useHistory();
    const {label, fetchLabel} = props;

    const {id} = useParams<{ id: string }>();

    useEffect(() => {

        if ((!label || !label.id) || (label.id.toString() !== id)) {
            fetchLabel(id);
        }
    }, [id, label, fetchLabel]);


    return (
        <Container className={"container"}>
            <Button className={"m-2"} variant="secondary" onClick={() => {
                history.goBack();
            }}>Back</Button>
            <div className={"content flex-container flex-container-column"}>
                <div className={"content flex-container flex-container-row"}>
                    <div className={"label"}>{label.name}</div>
                </div>
                <div className={"content flex-container flex-container-row"}>
                    <div className={"label"}>Origin</div>
                    <div className={"value"}>{label.origin}</div>
                </div>
                <div className={"content flex-container flex-container-row"}>
                    <div className={"label"}>Description</div>
                    <div className={"value"}>{label.shortDescription}</div>

                </div>
                <div className={"content flex-container flex-container-row"}>
                    <div className={"label"}>Link to website</div>
                    <div className={"value"}>{label.link}</div>

                </div>
                <div className={"content flex-container flex-container-row"}>
                    <div className={"label"}>Contact info</div>
                    <div className={"value"}>{label.contact}</div>

                </div>
                <div className={"content flex-container flex-container-row"}>
                    <div className={"label"}>Releases</div>
                    <ReleaseTable releases={props.label.releases}/>
                </div>
                <div className={"content flex-container flex-container-row"}>
                    <div className={"value"}>{label.labelImages}</div>

                </div>
            </div>
        </Container>

    )
}

export default Label;
