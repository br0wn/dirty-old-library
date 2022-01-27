import React from 'react';
import {IRelease} from "../../model/model.homepagetypes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRecordVinyl} from '@fortawesome/free-solid-svg-icons';
import {useHistory} from "react-router";


interface IReleaseTableProps {
    releases: IRelease[] | undefined;
}

function ReleaseTable(props: IReleaseTableProps) {

    const history = useHistory();

    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Released</th>
                <th scope="col"/>
            </tr>
            </thead>
            <tbody>
            {
                (props.releases || []).map((release, releaseIndex) => {
                    return (
                        <tr key={`discography-${releaseIndex}`}>
                            <th scope="row">{releaseIndex + 1}</th>
                            <td>{release.releaseTitle}</td>
                            <td>{release.year}</td>
                            <td onClick={() => {
                                history.push(`/release/${release.id}`);
                            }} style={{"border": "1px solid black"}}>
                                <FontAwesomeIcon icon={faRecordVinyl}/>
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}

export default ReleaseTable;
