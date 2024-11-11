import { createRoute } from "honox/factory"
import { getAccessToken, getPlaylistById, getTracksByPlaylistId } from "../../api/spotify";
import { createQuiz } from "../../quiz";
import Q from "../../islands/q";

export default createRoute(async (c) => {
  const id = c.req.param("id");
  const token = await getAccessToken();
  const playlist = await getPlaylistById(id, token);
  const tracks = await getTracksByPlaylistId(id, token);
  const quizList = createQuiz(tracks);
  return c.render(
    <div>
      <div>
        <h1>{playlist.name}</h1>
        <img src={playlist.images[0].url} alt={playlist.name} />
      </div>
      <p>{playlist.description}</p>
      <Q quizList={quizList} />
      <a href='/'>Go home</a>
    </div>
  )
});