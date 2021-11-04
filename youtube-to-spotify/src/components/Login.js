import React, { useState } from "react";
import { Redirect } from "react-router-dom";

export function Login() {

    const [session, setSession] = useState({access_token: null, user_id: null})

    if (session.access_token !== null && session.user_id !== null) {
        return <Redirect to="/" />;
    }

    else {
        var url = new URL(window.location.href)
        var params = new URLSearchParams(url.search);

        if (params.get("access_token") !== null && params.get("user_id") !== null) {
            let access_token = params.get("access_token")
            let user_id = params.get("user_id")
            window.sessionStorage.setItem("access_token", access_token)
            window.sessionStorage.setItem("user_id", user_id)
            setSession({ acccess_token: access_token, user_id: user_id})
        }
    }

    return (
        <div>
            <p>First Login to Spotify Account</p>
            <a href="http://localhost:5000/login/">Login</a>
        </div>
    );
}