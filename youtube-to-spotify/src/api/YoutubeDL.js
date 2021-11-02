export default async function getSongsFromYoutubePlaylist(playlist_url) {
    var response = await fetch("http://localhost:5000/playlistsongs", {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: playlist_url })
    })
    return response.json().then(data => data.songs)
}