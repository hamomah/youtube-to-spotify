import React from "react";
import { YoutubePlaylistSongs } from "./YoutubePlaylistSongs"

export function YoutubePlaylist(props) {

    var songs = props.songs
    var playlist_url = props.playlist_url

    function handleGetYoutubeSongs() {
        props.onGetYoutubeSongs()
    }

    function handleSearchSongsOnSpotify() {
        props.onSearchSongsOnSpotify()
    }

    return (
        <div>
            <YoutubePlaylistSongs songs={songs} />
            <button onClick={handleGetYoutubeSongs} style={{ display: playlist_url.length !== 0 ? 'block' : 'none' }}>Get songs from youtube playlist</button>
            <button onClick={handleSearchSongsOnSpotify} style={{ display: songs.length !== 0 ? 'block' : 'none' }}> Search for these songs on spotify </button>
        </div>
    );
}