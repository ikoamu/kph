import { css } from 'hono/css'
import { createRoute } from 'honox/factory'

const className = css`
  font-family: sans-serif;
`

// https://open.spotify.com/playlist/?si=aae9fa97b1634887

export default createRoute((c) => {
  const name = c.req.query('name') ?? 'Hono'
  return c.render(
    <div class={className}>
      <h1>Hello, {name}!</h1>
      <h2>Artists</h2>
      <ul>
        <li>
          <a href='/artists/7lbSsjYACZHn1MSDXPxNF2'>宇多田ヒカル</a>
        </li>
      </ul>
      <h2>Playlists</h2>
      <ul>
        <li>
          <a href='/playlists/37i9dQZEVXbKXQ4mDTEBXq'>トップ50 - 日本</a>
        </li>
        <li>
          <a href='/playlists/37i9dQZF1DWYQelb54GZmT'>平成ポップヒストリー</a>
        </li>
      </ul>
    </div>,
    { title: name }
  )
})
