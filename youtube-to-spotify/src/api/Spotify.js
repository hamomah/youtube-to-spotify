export async function createPlaylistAddSongs(access_token, user_id, songsFound) {
    var playlistId = await createPlaylist(access_token, user_id)
    return addTracksToPlaylist(access_token, songsFound, playlistId)
}


async function getSongOnSpotify(access_token, song) {
    var url = new URL('https://api.spotify.com/v1/search')
    url.searchParams.set("q", song.artist + " " + song.title)
    url.searchParams.set("type", "track")
    url.searchParams.set("market", "US")
    url.searchParams.set("limit", "1")

    const response = await fetch(url.toString(), {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + access_token
        }
    });

    var spotify_song = await response.json().then(data => {
        if (data.tracks.items.length !== 0) {
            return {
                id: data.tracks.items[0].uri,
                name: data.tracks.items[0].name,
                artist: data.tracks.items[0].artists[0].name,
                album_cover: data.tracks.items[0].album.images[1]
            }
        }
        else {
            return {
                id: ""
            }
        }
    })

    return {
        youtube_song: song,
        spotify_song: spotify_song,
    }
}

async function createPlaylist(access_token, user_id) {
    var createPlaylistUrl = new URL(`https://api.spotify.com/v1/users/${user_id}/playlists`)

    var createPlaylistResponse = await fetch(createPlaylistUrl.toString(), {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
        body: JSON.stringify({
            "name": "YTtoSP TESTING",
            "description": "Youtube to Spotify by Mahmoud",
            "public": false
        })
    });

    var playlistId = await createPlaylistResponse.json().then(data => data.id)
    return playlistId
}

async function addTracksToPlaylist(access_token, songsFound, playlistId) {

    var addTracksToPlaylistUrl = new URL(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`)

    var trackUris = songsFound.map((song) => song.spotify_song.id).toString()


    addTracksToPlaylistUrl.searchParams.set("uris", trackUris)

    var response = await fetch(addTracksToPlaylistUrl.toString(), {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + access_token
        }
    });
    return response
}

export async function searchSongsOnSpotify(access_token, songs) {
    var searchResult = await Promise.all(songs.map(async (song) => {
        return await getSongOnSpotify(access_token, song)
    }))

    return searchResult
}