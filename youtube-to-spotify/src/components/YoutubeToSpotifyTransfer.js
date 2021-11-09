import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom"
import PlaylistInput from './PlaylistInput'
import { SpotifySearchResult } from './SpotifySearchResult'
import { createPlaylistAddSongs, searchSongsOnSpotify } from "../api/Spotify";
import getSongsFromYoutubePlaylist from "../api/YoutubeDL";
import { YoutubePlaylist } from "./YoutubePlaylist"

export default function YoutubeToSpotifyTransfer() {
    const [playlist_url, setPlaylistURL] = useState("")
    const [songs, setSongs] = useState([])
    const [spotifySearchResult, setSpotifySearchResult] = useState({ songsFound: [], songsNotFound: [] })
    const [playlistCreated, setPlaylistCreated] = useState(false)

    var access_token = window.sessionStorage.getItem("access_token")
    var user_id = window.sessionStorage.getItem("user_id")

    useEffect(() => {
        let youtubePlaylist = window.sessionStorage.getItem("youtubePlaylist")
        if (youtubePlaylist !== null) {
            setSongs(JSON.parse(youtubePlaylist))
        }

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
        window.sessionStorage.setItem("youtubePlaylist", JSON.stringify(songs))
        window.sessionStorage.setItem("spotifySongs", JSON.stringify(spotifySearchResult))
        window.sessionStorage.setItem("playlistUrl", playlist_url)
    });

    async function onGetYoutubeSongs() {
        let songs = await getSongsFromYoutubePlaylist(playlist_url)
        setSongs(songs)
    }

    async function onSearchSongsOnSpotify() {
        let spotifySearchResult = await searchSongsOnSpotify(access_token, songs)
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
        setSongs([])
        setSpotifySearchResult({ songsFound: [], songsNotFound: [] })
        setPlaylistURL("")
    }

    if (access_token === null) {
        return <Redirect to="/login" />;
    }

    if (spotifySearchResult.songsFound.length !== 0 || spotifySearchResult.songsNotFound.length !== 0) {
        return (
            <div>
                <SpotifySearchResult spotifySearchResult={spotifySearchResult} playlistCreated={playlistCreated}
                    onCreatePlaylistAddSongs={onCreatePlaylistAddSongs} />
                <button onClick={onTansferAnotherPlaylist} style={{ display: playlistCreated === true ? 'block' : 'none' }}>Transfer another youtube playlist</button>
            </div>
        )
    }

    return (
        <div>
            <a href="/logout">Logout</a>
            <h2>Transfer Youtube Playlist to Spotify</h2>
            <hr />
            <PlaylistInput onPlaylistUrlChange={onPlaylistUrlChange} playlist_url={playlist_url} />
            <YoutubePlaylist songs={songs} playlist_url={playlist_url} onGetYoutubeSongs={onGetYoutubeSongs}
                onSearchSongsOnSpotify={onSearchSongsOnSpotify} />
        </div>
    )
}
