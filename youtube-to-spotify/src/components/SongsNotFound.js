import React from 'react'

export default function SongsNotFound(props) {

    var songsNotFound = props.songsNotFound

    if (songsNotFound.length !== 0) {
        return (
            <div>
                <h1> Songs not found on Spotify </h1>
                <div>{
                    songsNotFound.map((song) =>
                        <div key={song.youtube_song.title}>
                            {song.youtube_song.artist + " - " + song.youtube_song.title}
                            <br />
                            <img src={song.youtube_song.thumbnail} alt="cover"></img>
                        </div>
                    )
                }</div>
            </div>
        );
    }

    else {
        return (
            <div></div>
        )
    }
}
