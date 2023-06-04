package spotify

import (
	"net/http"
	"net/url"

	"github.com/mymixtape-api/spotify/models"
	"github.com/mymixtape-api/utils"
)

const (
	RESPONSE_TYPE = "code"
	SHOW_DIALOG = "true"
	SCOPE = "user-read-private user-read-email playlist-modify-public playlist-modify-private"
	SPOTIFY_AUTHORIZATION_URL = "https://accounts.spotify.com/authorize"
)

var (
	REQUEST_MANAGER = NewRequestManager(http.DefaultClient)
)

// Authorization Endpoints
func GetAuthorizationUrl(client_id string, client_secret string, redirect_uri string) (*models.SpotifyAuthorizationUrlResponse, *models.SpotifyErrorResponse) {

	state := utils.GenerateAuthorizationState()

	parameters := url.Values{
		"client_id": {client_id},
		"response_type": {RESPONSE_TYPE},
		"redirect_uri": {redirect_uri},
		"scope": {SCOPE},
		"state": {state},
		"show_dialog": {SHOW_DIALOG},
	}

	authorizationUrl := utils.GenerateAuthorizationUrl(SPOTIFY_AUTHORIZATION_URL, parameters)

	return &models.SpotifyAuthorizationUrlResponse{
		Url: authorizationUrl,
	}, nil
}


func GetAccessToken(code string, client_id string, client_secret, redirect_uri string) *models.SpotifyAuthenticationErrorResponse {
	if err := REQUEST_MANAGER.SetToken(code, redirect_uri, client_id, client_secret); err != nil {
		return &models.SpotifyAuthenticationErrorResponse{
			Error: "AccessToken Error",
			Description: "There was a problem getting the access token",
		}
	}

	return nil
}

// User Endpoints
func GetCurrentUsersProfile() (*models.SpotifyCurrentUsersProfileResponse, *models.SpotifyErrorResponse) {

	var spotifyCurrentUsersProfileResponse *models.SpotifyCurrentUsersProfileResponse

	if err := REQUEST_MANAGER.GetInto("/me", &spotifyCurrentUsersProfileResponse); err != nil {
		return nil, &models.SpotifyErrorResponse{
			Error: models.SpotifyErrorObjectResponse{
				Status: http.StatusInternalServerError,
				Message: err.Error(),
			},
		}
	}

	return spotifyCurrentUsersProfileResponse, nil
}



// Playlist Endpoints
// will need to add parameters for limit and offset for paginations
func GetCurrentUsersPlaylists() (*models.SpotifyCurrentUsersPlaylistsResponse, *models.SpotifyErrorResponse) {

	var spotifyCurrentUsersPlaylistsResponse *models.SpotifyCurrentUsersPlaylistsResponse

	if err := REQUEST_MANAGER.GetInto("/me/playlists", &spotifyCurrentUsersPlaylistsResponse); err != nil {
		return nil, &models.SpotifyErrorResponse{
			Error: models.SpotifyErrorObjectResponse{
				Status: http.StatusInternalServerError,
				Message: err.Error(),
			},
		}
	}

	return spotifyCurrentUsersPlaylistsResponse, nil

}