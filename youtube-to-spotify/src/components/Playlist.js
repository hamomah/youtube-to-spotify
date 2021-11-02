import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { createPlaylistAndSongs } from "../api/Spotify";
import getSongsFromYoutubePlaylist from "../api/YoutubeDL";

export function Playlist() {

    const [playlist_url, setPlaylistURL] = useState("")
    const [songs, setSongs] = useState([])


    var access_token = window.sessionStorage.getItem("access_token")
    var user_id = window.sessionStorage.getItem("user_id")

    function handleUrlInput(event) {
        setPlaylistURL(event.target.value)
    }


    function handleCreatePlaylist() {
        if (songs.length !== 0) {
            createPlaylistAndSongs(access_token, user_id, songs)
        }
    }

    async function handleGetYoutubeSongs() {
        let songs = await getSongsFromYoutubePlaylist(playlist_url)
        setSongs(songs)

    }


    if (access_token === null) {
        return <Redirect to="/login" />;
    }


    return (
        <div>
            <h2>Transfer Youtube Playlist to Spotify</h2>
            <hr />
            <p>Enter a public/unlisted youtube playlist you want to transfer to spotify</p>
            <label>
                <input onChange={handleUrlInput} type="text" placeholder="Playlist URL" />
            </label>
            <br />
            <br />

            <button onClick={handleGetYoutubeSongs}>Get Songs from Youtube Playlist</button>
            <br />
            <br />
            <div>{
                songs.map((song) => <div key={song.title}>
                    {song.artist + " - " + song.title}
                    <br />
                    <img src={song.thumbnail} alt="cover"></img>
                </div>
                )
            }</div>
            <br />
            <button onClick={handleCreatePlaylist} disabled={songs.length === 0}>Add these Songs to my Spotify Account</button>

            <br />
            <br />
            <a href="/logout">Logout</a>
        </div>
    );
}