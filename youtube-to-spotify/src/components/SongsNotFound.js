import React from 'react'
import SongNotFoundRow from './SongNotFoundRow';

export default function SongsNotFound(props) {

    var songsNotFound = props.songsNotFound

    if (songsNotFound.length !== 0) {
        return (
            <>
            {
                songsNotFound.map((song) => < SongNotFoundRow key={song.youtube_song.title} song={song} />)
            }
            </>
        );
    }

    else {
        return (
            <div></div>
        )
    }
}
