import { createRoute } from "honox/factory"
import { getAccessToken, getPlaylistById, getTracksByPlaylistId } from "../../api/spotify";

export default createRoute(async (c) => {
  const id = c.req.param("id");
  const token = await getAccessToken();
  const playlist = await getPlaylistById(id, token);
  const tracks = await getTracksByPlaylistId(id, token);
  return c.render(
    <div>
      <div>
        <h1>{playlist.name}</h1>
        <img src={playlist.images[0].url} alt={playlist.name} />
      </div>
      <p>{playlist.description}</p>
      <p>track count: {tracks.length}</p>
      <ul>
        {tracks.map(([name, previewUrl]) => (
          <li>
            {name}
            {previewUrl && <audio controls src={previewUrl} />}
          </li>
        ))}
      </ul>
      <a href='/'>Go home</a>
    </div>
  )
});