<div align="center">
    <br>
    <h1>MyMixtape 🎶</h1>
    <strong>Unite your playlists, amplify your vibes.</strong>
</div>
<br>

Welcome to the MyMixtape codebase, a web tool that allows users to organize their Spotify playlists.

## Getting Started

This section provides a high-level quick start guide.

MyMixtape runs on a [Go](https://go.dev/) and [Gin](https://gin-gonic.com/) backend and uses a [Next.js](https://nextjs.org/) frontend.

- [Go](https://go.dev/) v1.18.x
- [Node.js](https://nodejs.org/en) v18.16.x
- [Next.js](https://nextjs.org/) v13
- [Spotify Web Api](https://developer.spotify.com/documentation/web-api)
- [Bootstrap](https://getbootstrap.com/) v5.3.0

## To-do

### Features

- Able to combine Collaborative Playlists
- ~~Docker Support~~

### Frontend

- Add client-side validation
- Add loading/placeholders on elements
- Unit testing
- Caching
- ~~Utilize Cookies for token~~
- ~~Improve UI on web and mobile~~
- ~~Utilize Next.js SSR~~
- ~~Use React Context~~

### Backend

- Redis for Session
- Add logging
- Proper error handling
- Add in transaction rollback functionality to combine playlists
- Handle rate-limiting
- Server side validation
- Unit tests
