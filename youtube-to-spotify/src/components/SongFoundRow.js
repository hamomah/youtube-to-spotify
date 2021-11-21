import React from 'react'

export default function SongFoundRow(props) {

    var song = props.song

    return (
        <div className="song-found">
            <div className="songs">
                <div className="song">
                    <img className="cover" src={song.youtube_song.thumbnail} alt="cover"></img>
                </div>
                <div className="song">
                    <img className="cover" src={song.spotify_song.album_cover.url} alt="cover"></img>
                </div>
            </div>
            <div className="titles">
                <div className="title">
                    <div> {song.youtube_song.artist} </div>
                    <div> {song.youtube_song.title} </div>
                </div>
                <div className="title">
                    <div> {song.spotify_song.artist} </div>
                    <div> {song.spotify_song.name} </div>
                </div>
            </div>
        </div >
    )
}
