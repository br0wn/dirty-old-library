import React from 'react';
import './App.css';
import HomePageContainer from './view/homepage/HomePageContainer';
import {Route, Switch} from 'react-router';
import {BrowserRouter as Router} from "react-router-dom";
import ReleaseContainer from "./view/release/ReleaseContainer";
import LabelContainer from "./view/label/LabelContainer";
import ArtistContainer from "./view/artist/ArtistContainer";
import VenueContainer from "./view/venue/VenueContainer";
import EventContainer from "./view/event/EventContainer";

const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path='/release/:id' component={ReleaseContainer}/>
                    <Route path='/label/:id' component={LabelContainer}/>
                    <Route path='/artist/:id' component={ArtistContainer}/>
                    <Route path='/venue/:id' component={VenueContainer}/>
                    <Route path='/event/:id' component={EventContainer}/>
                    <Route path='/' component={HomePageContainer}/>
                </Switch>
            </Router>
            <footer id={"footer"} className={"footer"}>
                <div className={"content flex-container flex-container-row"}>
                    <div className={"col-6"}>copyright</div>
                    <div className={"col-6"}>links to pages (which pages?)</div>
                </div>
            </footer>
        </div>
    );
};

export default App;
