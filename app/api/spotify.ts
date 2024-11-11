const clientId = "";
const clientSecret = "";
const tokenEndpoint = "https://accounts.spotify.com/api/token";

type TracksResponse = {
  items: { track: { name: string; preview_url?: string } }[];
};

type ArtistResponse = {
  name: string;
  images: { url: string }[];
};

type AlbumResponse = {
  items: { name: string; uri: string; images: { url: string }[] }[];
};

export const getAccessToken = async () => {
  const res = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });

  const data = (await res.json()) as { access_token: string };
  return data["access_token"];
};

export const getTracksByPlaylistId = async (id: string, token: string) => {
  const res = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const data = (await res.json()) as TracksResponse;
  return data.items.map(
    (item) => [item.track.name, item.track.preview_url] as const
  );
};

export const getArtistById = async (id: string, token: string) => {
  const res = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const data = (await res.json()) as ArtistResponse;
  return data;
};

export const getAlbumsByArtistId = async (id: string, token: string) => {
  const res = await fetch(`https://api.spotify.com/v1/artists/${id}/albums`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const data = (await res.json()) as AlbumResponse;
  return data.items;
};

export const getTracksByAlbumIds = async (ids: string[], token: string) => {
  const res = await Promise.all(
    ids.map((id) =>
      fetch(`https://api.spotify.com/v1/albums/${id}/tracks`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
    )
  );
  const data = await Promise.all<{
    items: {
      artists: { name: string }[];
      available_markets: string[];
      disc_number: number;
      duration_ms: number;
      explicit: boolean;
      external_urls: { spotify: string };
      href: string;
      id: string;
      name: string;
      track_number: number;
      type: string;
      uri: string;
      is_local: boolean;
      preview_url?: string;
    }[];
  }>(
    res.map((r) => {
      return r.json();
    })
  );

  return data.flatMap((d) =>
    d.items.map((item) => [item.name, item.preview_url] as const)
  );
};

export const getPlaylistById = async (id: string, token: string) => {
  const res = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((res) => res.json());
  console.log(res);
  return res as {
    name: string;
    description: string;
    images: { url: string }[];
  };
};
