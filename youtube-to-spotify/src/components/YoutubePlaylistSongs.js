import React from 'react'

export function YoutubePlaylistSongs(props) {

    var songs = props.songs
    
    return (
        <div>
            {
                songs.map((song) => <div key={song.title}>
                    {song.artist + " - " + song.title}
                    <br/>
                    <img src={song.thumbnail} alt="cover"></img>
                </div>
                )
            }
        </div>
    )
}
