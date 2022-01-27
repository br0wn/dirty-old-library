import React, {useState} from 'react';
import NavigationBar from '../components/NavigationBar';
import Container from 'react-bootstrap/Container';
import './HomePage.css';
import '../../assets/css/grid.css';
import {ARTISTS, EVENTS, IHomePageData, VENUES} from '../../model/model.homepagetypes';
import {IHomePageMapData} from '../../model/model.maptypes';
import {IPosition} from '../../model/IPosition';
import {LatLngBounds} from 'leaflet';
import Map from "./map/Map";
import Form from 'react-bootstrap/Form';
import HomePageItems from './HomePageItems';

interface IHomePageProps {
    homePageData: IHomePageData;
    mapData: IHomePageMapData;
    mapPosition: IPosition;
    fetchHomePageData: (searchInput: string) => void;
    fetchHomePageMapData: (position: IPosition, bounds: LatLngBounds) => void;
    updateMapPosition: (position: IPosition) => void;
    updateMapZoom: (zoom: number) => void;
}


function HomePage(props: IHomePageProps) {

    const [searchInput, setSearchInput] = useState("");
    const [selectedItemTypes, setSelectedItemTypes] =
        useState([EVENTS, ARTISTS, VENUES]);

    function handleCheckChange(checkedType: string) {
        if (selectedItemTypes.includes(checkedType)) {
            setSelectedItemTypes([...selectedItemTypes].filter((type) => type !== checkedType));
        } else {
            setSelectedItemTypes([...selectedItemTypes, checkedType]);
        }
    }

    return (
        <Container className={"container"}>
            <NavigationBar searchInput={searchInput} setSearchInput={setSearchInput}
                           fetchHomePageData={props.fetchHomePageData}/>
            <div className={"content flex-container homePageHolder justify-content-space-between m-2"}>
                            <div className={"m-2 w-25"}>
                                <HomePageItems homePageData={props.homePageData}
                                               selectedItemTypes={selectedItemTypes}/>
                            </div>
                            <div className={"m-2 w-75"}>
                                <Form>
                                    {['checkbox'].map(type => (
                                        <div key={`inline-${type}`} className="mb-3">
                                            <Form.Check
                                                onChange={() => (handleCheckChange(EVENTS))}
                                                inline label={"Events"} id={`inline-${type}-1`}
                                                checked={selectedItemTypes.includes(EVENTS)}/>
                                            <Form.Check
                                                onChange={() => (handleCheckChange(ARTISTS))}
                                                inline label={"Artists"} id={`inline-${type}-2`}
                                                checked={selectedItemTypes.includes(ARTISTS)}/>
                                            <Form.Check
                                                onChange={() => (handleCheckChange(VENUES))}
                                                inline label={"Ventures"} id={`inline-${type}-4`}
                                                checked={selectedItemTypes.includes(VENUES)}/>
                                        </div>
                                    ))}
                                </Form>
                                <Map
                                    mapData={props.mapData}
                                    mapPosition={props.mapPosition}
                                    updateMapPosition={props.updateMapPosition}
                                    updateMapZoom={props.updateMapZoom}
                                    fetchHomePageMapData={props.fetchHomePageMapData}
                                    selectedItemTypes={selectedItemTypes}
                                />
                            </div>
                        </div>
        </Container>
    )
}

export default HomePage
