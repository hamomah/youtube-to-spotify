import React from 'react'
import SongFoundRow from './SongFoundRow';

export default function SongsFound(props) {

    var songsFound = props.songsFound

    if (songsFound.length !== 0) {
        return (
            <div>
                <h1> Songs found on Spotify </h1>
                <table>
                    <tbody>
                        <tr>
                            <th>Song in youtube playlist</th>
                            <th>Song found on spotify</th>
                        </tr>
                        {
                            songsFound.map((song) => <SongFoundRow key={song.spotify_song.name} song={song} />)
                        }
                    </tbody>
                </table>
            </div>
        );
    }
    else {
        return (
            <div></div>
        )
    }
}
