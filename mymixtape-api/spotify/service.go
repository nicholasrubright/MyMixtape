package spotify

import (
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