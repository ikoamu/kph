import { createRoute } from "honox/factory"
import { getAccessToken, getAlbumsByArtistId, getArtistById, getTracksByAlbumIds } from "../../api/spotify";

const albumUriToId = (uri: string) => uri.split(":")[2];

export default createRoute(async (c) => {
  const id = c.req.param("id");
  const token = await getAccessToken();
  const artist = await getArtistById(id, token);
  const albums = await getAlbumsByArtistId(id, token);
  const tracks = await getTracksByAlbumIds(albums.map((album) => albumUriToId(album.uri)), token);
  return c.render(
    <div>
      <h1>{artist.name}</h1>
      <p>track count: {tracks.length}</p>
      <ul>
        {tracks.map(t => (
          <li>
            {t[0]} ({t[1]})
          </li>
        ))}
      </ul>

      <a href='/'>Go home</a>
    </div>
  )
});