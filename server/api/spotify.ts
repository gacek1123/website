
const basicAuth = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64");

const getAccessToken = () => {

  const params = new URLSearchParams()

  params.set("grant_type", "refresh_token")
  params.set("refresh_token", process.env.SPOTIFY_REFRESH_TOKEN as string)

  return $fetch<{ access_token: string }>("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basicAuth}`
    },
    body: params
  });
};

const getNowPlaying = async () => {
  try {
    const { access_token } = await getAccessToken();

    const response = await $fetch<Record<string, any>>("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    return {
      isPlaying: response.is_playing,
      songUrl: response.item.external_urls.spotify,
      name: response.item.name,
      artist: response.item.artists.map((artist: { name: string }) => artist.name)
    }
  } catch (err) {
    console.log(err)
    return {
      isPlaying: false,
      songUrl: null,
      name: null,
      artist: null,
    };
  }
};

export default eventHandler(() => getNowPlaying());