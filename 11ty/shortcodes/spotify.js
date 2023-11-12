/**
 * https://luigicruz.dev/blog/using-spotify-api
 * https://henry.codes/writing/spotify-now-playing/#tl%3Bdr
 */
const dotenv = require("dotenv");
dotenv.config();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
const scope = "user-read-recently-played";
const redirectUri = "http://localhost:8080/";

const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=refresh_token&refresh_token=${refreshToken}&scope=${scope}&redirect_uri=${redirectUri}
    )}`,
  });

  return response.json();
};

const getRecentlyPlayedTracks = async () => {
  const { access_token } = await getAccessToken();

  return fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

module.exports = {
  getRecentlyPlayedTracks,
};
