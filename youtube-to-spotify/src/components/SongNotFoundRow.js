import React from 'react'

export default function SongNotFoundRow(props) {

    var song = props.song

    return (
        <div className="song-not-found">
            <div className="song">
                <img className="cover" src={song.youtube_song.thumbnail} alt="cover"></img>
            </div>
            <div className="title">
                <div> {song.youtube_song.artist} </div>
                <div> {song.youtube_song.title} </div>
            </div>
        </div>
    )
}
