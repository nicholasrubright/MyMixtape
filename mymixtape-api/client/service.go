package client

import (
	"net/http"

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

func GetAccessToken(code string, client_id string, client_secret string, redirect_uri string) *models.ClientErrorResponse {
	spotifyErrorResponse := spotify.GetAccessToken(code, client_id, client_secret, redirect_uri)

	if spotifyErrorResponse != nil {
		return &models.ClientErrorResponse{
			Message: spotifyErrorResponse.Description,
			Status: http.StatusBadRequest,
		}
	}

	return nil
}

// User Profile
func GetCurrentUsersProfile() (*models.ClientCurrentUsersProfileResponse, *models.ClientErrorResponse) {

	spotifyCurrentUsersProfileResponse, spotifyErrorResponse := spotify.GetCurrentUsersProfile()

	if spotifyErrorResponse != nil {
		return nil, &models.ClientErrorResponse{
			Message: spotifyErrorResponse.Error.Message,
			Status: spotifyErrorResponse.Error.Status,
		}
	}

	return &models.ClientCurrentUsersProfileResponse{
		ID: spotifyCurrentUsersProfileResponse.ID,
		Name: spotifyCurrentUsersProfileResponse.DisplayName,
		Images: spotifyCurrentUsersProfileResponse.Images,
	}, nil

}