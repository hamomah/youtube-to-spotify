import React from 'react'

export default function PlaylistInput(props) {

    var playlist_url = props.playlist_url

    function handleUrlInput(event) {
        props.onPlaylistUrlChange(event.target.value)
    }

    return (
        <div>
            <p>Enter a public/unlisted youtube playlist you want to transfer to spotify</p>
            <label>
                <input onChange={handleUrlInput} value={playlist_url} type="text" placeholder="Playlist URL" />
            </label>
            <button onClick={props.onGetYoutubeSongsAndSearchOnSpotify} disabled={playlist_url.length === 0 ? true : false}>Search for songs on spotify</button>
        </div>
    )
}
