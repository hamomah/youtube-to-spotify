import React from "react";
import SongsFound from "./SongsFound";
import SongsNotFound from "./SongsNotFound";


export function SpotifySearchResult(props) {

    var spotifySearchResult = props.spotifySearchResult
    var playlistCreated = props.playlistCreated


    function handleCreatePlaylistAndSongs() {
        props.onCreatePlaylistAddSongs()
    }
    if (spotifySearchResult.songsFound.length !== 0 || spotifySearchResult.songsNotFound.length !== 0){
        console.log("spoti")
        return (
            <div className="container">
                <SongsFound songsFound={spotifySearchResult.songsFound} />
                <SongsNotFound songsNotFound={spotifySearchResult.songsNotFound} />
                <button onClick={handleCreatePlaylistAndSongs} style={{ display: spotifySearchResult.songsFound.length !== 0 && playlistCreated === false ? 'block' : 'none' }}>Add songs found to my spotify account</button>
            </div>
        )
    }

    return(
        <div></div>
    )
}

