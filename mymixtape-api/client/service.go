package client

import (
	"github.com/mymixtape-api/client/models"
	"github.com/mymixtape-api/spotify"
)

func GetAuthorizationUrl(client_id string, client_secret string, redirect_uri string) (*models.ClientAuthorizationUrlResponse, *models.ClientErrorResponse) {

	spotifyAuthorzationUrlResponse, spotifyErrorResponse := spotify.GetAuthorizationUrl(client_id, client_secret, redirect_uri)

	if spotifyErrorResponse != nil {
		return nil, &models.ClientErrorResponse{
			Message: spotifyErrorResponse.Error.Message,
			Status: spotifyErrorResponse.Error.Status,
		}
	}

	return &models.ClientAuthorizationUrlResponse{
		Url: spotifyAuthorzationUrlResponse.Url,
	}, nil


}