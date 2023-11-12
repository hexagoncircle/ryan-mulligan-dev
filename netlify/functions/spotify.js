const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const LAST_PLAYED_ENPOINT = `https://api.spotify.com/v1/me/player/recently-played`;

exports.handler = async (event, context) => {
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  const auth = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const options = {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=refresh_token&refresh_token=${refreshToken}&response_type=token&redirect_uri=${encodeURI(
      process.env.URL,
      +"/.netlify/functions/callback"
    )}`,
  };

  const accessToken = await fetch(TOKEN_ENDPOINT, options)
    .then((res) => res.json())
    .then((json) => {
      return json.access_token;
    })
    .catch((err) => {
      console.err(err);
    });

  return fetch(`${LAST_PLAYED_ENPOINT}?limit=1`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .then(({ items }) => {
      const { artists, name, external_urls } = items[0].track;

      return {
        statusCode: 200,
        body: JSON.stringify({
          artist: artists[0].name,
          track: {
            name,
            url: external_urls.spotify,
          },
        }),
      };
    });
};
