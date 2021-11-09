const ytpl = require('ytpl');
const ytdl = require('ytdl-core');
const getArtistTitle = require('get-artist-title')

async function getplaylistsongs(url) {
    var playlistsongs = await ytpl(url)
    return await Promise.all(playlistsongs.items.map(async (element) => {
        return await getsonginfo(element)
    }))
}


async function getsonginfo(video) {
    const videoResponse = await ytdl.getBasicInfo(video.shortUrl);
    console.log(videoResponse.videoDetails)
    let [artist, title] = getArtistTitle(videoResponse.videoDetails.title, {
        defaultArtist: videoResponse.videoDetails.media?.arist ?? videoResponse.videoDetails.ownerChannelName,
        defaultTitle: videoResponse.videoDetails.media?.song ?? ""
    });

    [artist, title] = replaceWords(artist, title);

    return {
        artist: artist,
        title: title,
        youtubeTitle: videoResponse.videoDetails.title,
        thumbnail: videoResponse.videoDetails.thumbnails[3].url,
        video_id: videoResponse.videoDetails.video_id
    };
}



function replaceWords(artist, title) {

    var wordsToReplace = [
        "ft.",
        "ft",
        "feat.",
        "feat",
        "featuring.",
        "featuring",
        "- topic"
    ]

    artist = artist.toLowerCase()
    title = title.toLowerCase()
    wordsToReplace.forEach(word => {
        artist = artist.replace(word, "")
        title = title.replace(word, "")
    });
    return [artist, title]
}

exports.getplaylistsongs = getplaylistsongs;