import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom"
import PlaylistInput from './PlaylistInput'
import { SpotifySearchResult } from './SpotifySearchResult'
import { createPlaylistAddSongs, searchSongsOnSpotify } from "../api/Spotify";
import getSongsFromYoutubePlaylist from "../api/YoutubeDL";

export default function YoutubeToSpotifyTransfer() {
    const [playlist_url, setPlaylistURL] = useState("")
    const [spotifySearchResult, setSpotifySearchResult] = useState({ songsFound: [], songsNotFound: [] })
    const [playlistCreated, setPlaylistCreated] = useState(false)

    var access_token = window.sessionStorage.getItem("access_token")
    var user_id = window.sessionStorage.getItem("user_id")

    useEffect(() => {
        let playlistUrl = window.sessionStorage.getItem("playlistUrl")
        if (playlistUrl !== null) {
            setPlaylistURL(playlistUrl)
        }

        let spotifySongs = window.sessionStorage.getItem("spotifySongs")
        if (spotifySongs !== null) {
            setSpotifySearchResult(JSON.parse(spotifySongs))
        }

    }, []);

    useEffect(() => {
        window.sessionStorage.setItem("spotifySongs", JSON.stringify(spotifySearchResult))
        window.sessionStorage.setItem("playlistUrl", playlist_url)
    });

    async function onGetYoutubeSongsAndSearchOnSpotify() {
        await getYoutubeSongs().then(async (youtubeSongs) => {
            searchYoutubeSongsOnSpotify(youtubeSongs)
        })
    }

    async function getYoutubeSongs() {
        let youtubeSongs = await getSongsFromYoutubePlaylist(playlist_url)
        return youtubeSongs
    }

    async function searchYoutubeSongsOnSpotify(youtubeSongs) {
        let spotifySearchResult = await searchSongsOnSpotify(access_token, youtubeSongs)
        var songsFound = spotifySearchResult.filter((song) => song.spotify_song.id.length !== 0)
        var songsNotFound = spotifySearchResult.filter((song) => song.spotify_song.id.length === 0)

        setSpotifySearchResult({
            songsFound: songsFound,
            songsNotFound: songsNotFound
        })
    }

    async function onCreatePlaylistAddSongs() {
        let response = await createPlaylistAddSongs(access_token, user_id, spotifySearchResult.songsFound)
        if (response.status === 201) {
            setPlaylistCreated(true)
        }

    }

    function onPlaylistUrlChange(value) {
        setPlaylistURL(value)
    }

    function onTansferAnotherPlaylist() {
        setSpotifySearchResult({ songsFound: [], songsNotFound: [] })
        setPlaylistURL("")
        setPlaylistCreated(false)
    }

    if (access_token === null) {
        return <Redirect to="/login" />;
    }



    return (
        <div>
            <a href="/logout">Logout</a>
            <h2>Transfer Youtube Playlist to Spotify</h2>
            <hr />
            <PlaylistInput onPlaylistUrlChange={onPlaylistUrlChange} onGetYoutubeSongsAndSearchOnSpotify={onGetYoutubeSongsAndSearchOnSpotify} playlist_url={playlist_url} />
            <SpotifySearchResult spotifySearchResult={spotifySearchResult} playlistCreated={playlistCreated}
                onCreatePlaylistAddSongs={onCreatePlaylistAddSongs} />
            <button onClick={onTansferAnotherPlaylist} style={{ display: playlistCreated === true ? 'block' : 'none' }}>Transfer another youtube playlist</button>
        </div>
    )
}
