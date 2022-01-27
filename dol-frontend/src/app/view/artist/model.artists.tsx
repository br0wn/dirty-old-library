import React from 'react';
import {IArtist} from '../../model/model.homepagetypes';
import {useHistory} from "react-router";

interface IArtistsProps {
    artists: IArtist[];
}

function ModelArtists(props: IArtistsProps) {

    const history = useHistory();

    return (
        <div className={"flex-container flex-container-column"} style={{fontSize: "0.75vw"}}>
            <ul className="list-group">
                {
                    (props.artists || []).map((artist: IArtist, index: number) => {
                        return (
                            <li key={`artist-list-${index}`} className={"list-group-item"} style={{"cursor": "pointer"}}
                                onClick={() => {
                                    history.push(`/artist/${artist.detail_id}`)
                                }}>
                                <div className="d-flex w-100 justify-content-between">
                                    <div className="mb-1">{artist.name}</div>
                                </div>
                                <p className="mb-1">{artist.description}</p></li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default ModelArtists
