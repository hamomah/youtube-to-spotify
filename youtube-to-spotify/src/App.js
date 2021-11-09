import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import YoutubeToSpotifyTransfer from "./components/YoutubeToSpotifyTransfer";

export default function App() {

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <YoutubeToSpotifyTransfer />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/logout">
                    <Logout />
                </Route>
            </Switch>
        </Router>
    );
}