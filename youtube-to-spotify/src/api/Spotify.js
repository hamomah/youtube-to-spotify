export async function createPlaylistAndSongs(access_token, user_id, songs) {
    console.log(songs)
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

    var ids = await Promise.all(songs.map(async (song) => {
        return await getSongId(access_token, song)
    }))

    var addTracksToPlaylistUrl = new URL(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`)

    addTracksToPlaylistUrl.searchParams.set("uris", ids.toString())

    await fetch(addTracksToPlaylistUrl.toString(), {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + access_token
        }
    });
}


async function getSongId(access_token, song) {
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

    var id = await response.json().then(data => data.tracks.items[0].uri)

    return id
}