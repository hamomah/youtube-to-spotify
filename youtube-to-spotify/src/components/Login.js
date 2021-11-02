import React, { useState } from "react";
import { Redirect } from "react-router-dom";

export function Login() {

    const [access_token, setAccessToken] = useState(window.sessionStorage.getItem("access_token"))
    const [user_id, setUserId] = useState(window.sessionStorage.getItem("access_token"))

    if (access_token !== null && user_id !== null) {
        return <Redirect to="/" />;
    }

    else {
        var url = new URL(window.location.href);
        var params = new URLSearchParams(url.searchParams);

        if (params.get("access_token") !== null && params.get("user_id") !== null) {
            window.sessionStorage.setItem("access_token", params.get("access_token"))
            window.sessionStorage.setItem("user_id", params.get("user_id"))

            setAccessToken(window.sessionStorage.getItem("access_token"))
            setUserId(window.sessionStorage.getItem("user_id"))
        }
    }

    return (
        <div>
            <p>First Login to Spotify Account</p>
            <a href="http://localhost:5000/login/">Login</a>
        </div>
    );
}