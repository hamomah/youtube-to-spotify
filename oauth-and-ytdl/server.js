const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const axios = require('axios').default;
const qs = require('qs');
const YTDL = require('./youtubedl')


var app = express();

const CORS_OPTIONS = {
  origin: 'http://localhost:3000',
}

app.use(cookieParser()).use(cors(CORS_OPTIONS)).use(express.json())


const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const redirect_uri = 'http://localhost:5000/callback';

var generateRandomString = function () {
  return Math.random().toString((Math.random() * 34) + 2).substring(2) +
    Math.random().toString((Math.random() * 34) + 2).substring(2);
};

const STATE_KEY = 'spotify_auth_state';

app.get('/login', function (req, res) {
  var state = generateRandomString();
  res.cookie(STATE_KEY, state);

  var scope = 'playlist-read-private playlist-modify-public playlist-modify-private ';

  res.redirect('https://accounts.spotify.com/authorize?' +
    qs.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});


app.get('/callback', function (req, res) {

  var code = req.query.code || null;
  var state = req.query.state || null;
  console.log(state)
  var storedState = req.cookies ? req.cookies[STATE_KEY] : null;
  console.log(req.cookies)

  if (state === null || state !== storedState) {
    res.redirect('http://localhost:3000/#' +
      qs.stringify({
        error: 'error'
      }));
  } else {
    res.clearCookie(STATE_KEY);

    var authOptions = {
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      data: qs.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri
      }),
      headers: {
        'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
        'Content-Type': "application/x-www-form-urlencoded"
      },
    };

    axios(
      authOptions
    ).then(async response => {
      if (response.status === 200) {

        var access_token = response.data.access_token
        // var refresh_token = response.data.refresh_token

        var user_id = await getUserId(access_token);

        console.log(user_id)

        res.redirect('http://localhost:3000/login?' +
          qs.stringify({
            access_token: access_token,
            // refresh_token: refresh_token,
            user_id: user_id
          }));
      } else {
        res.redirect('http://localhost:3000/login?' +
          qs.stringify({
            error: 'invalid_token'
          }));
      }
    })
  }
});

app.post("/playlistsongs", async function (req, res) {
  var url = req.body.url
  var songs = await YTDL.getplaylistsongs(url)
  res.send({
    songs: songs
  })
})


async function getUserId(access_token) {

  var authOptions = {
    method: 'GET',
    url: 'https://api.spotify.com/v1/me',
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
  }

  return axios(
    authOptions
  ).then(response => {
    console.log(response.data)
    if (response.status === 200) {
      return response.data.id
    } else {
      return 0
    }
  })
}


console.log('Authentication Server Listening on 5000');
app.listen(5000);