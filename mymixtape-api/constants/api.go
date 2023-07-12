package constants

const (
	SCHEME = "https"
	HOST = "api.spotify.com"
	VERSION = "v1"
	TOKEN_URL = "https://accounts.spotify.com/api/token"
	RESPONSE_TYPE = "code"
	SHOW_DIALOG = "true"
	SCOPE = "user-read-private user-read-email playlist-modify-public playlist-modify-private"
	TRACK_FIELDS = "href,limit,next,offset,previous,total,items(track(name,id))"
	SPOTIFY_AUTHORIZATION_URL = "https://accounts.spotify.com/authorize"
	API_URL = "https://api.spotify.com/v1"

	// Access Token
	GRANT_TYPE = "authorization_code"

	// Session
	TIME_FORMAT = "YYYY-MM-DD HH:MM:SS"
)