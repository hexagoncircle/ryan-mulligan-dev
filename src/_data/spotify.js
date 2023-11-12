/**
 * Some helpful resources to get this functionality cooking
 * {@link https://luigicruz.dev/blog/using-spotify-api}
 * {@link https://henry.codes/writing/spotify-now-playing/}
 */
const EleventyFetch = require("@11ty/eleventy-fetch");
const dotenv = require("dotenv");

dotenv.config();

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
const scope = "user-read-recently-played";

const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

const getAccessToken = async () => {
  let res = await EleventyFetch(TOKEN_ENDPOINT, {
    duration: "10m",
    type: "json",
    fetchOptions: {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}&scope=${scope}`,
    },
  });

  return res;
};

module.exports = async () => {
  let { access_token } = await getAccessToken();

  let res = await EleventyFetch(RECENTLY_PLAYED_ENDPOINT + "?limit=1", {
    duration: "10m",
    type: "json",
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  });

  let { artists, name, external_urls } = res.items[0].track;

  return {
    artist: artists[0].name,
    track: {
      name,
      url: external_urls.spotify,
    },
  };
};
