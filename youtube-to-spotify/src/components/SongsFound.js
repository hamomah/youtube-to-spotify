import React from 'react'
import SongFoundRow from './SongFoundRow';

export default function SongsFound(props) {

    var songsFound = props.songsFound

    if (songsFound.length !== 0) {
        return (
            <div>
                {
                    songsFound.map((song) => < SongFoundRow key={song.spotify_song.name} song={song} />)
                }
            </div>
        );
    }
    else {
        return (
            <div></div>
        )
    }
}
