import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Playlist } from "./components/Playlist";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";

export default function App() {

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Playlist />
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