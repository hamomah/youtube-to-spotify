import React from 'react'

export default function SongFoundRow(props) {

    var song = props.song

    return (
        <tr>
            <td >
                {song.youtube_song.artist + " - " + song.youtube_song.title}
                <br />
                <img src={song.youtube_song.thumbnail} alt="cover"></img>
            </td>
            <td>
                {song.spotify_song.artist + " - " + song.spotify_song.name}
                <br />
                <img src={song.spotify_song.album_cover.url} alt="cover"></img>
            </td>
        </tr>
    )
}
