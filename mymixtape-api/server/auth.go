package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mymixtape-api/spotify"
	"github.com/mymixtape-api/spotify/models"
)

var (
	SPOTIFY_CLIENT_ID = ""
	SPOTIFY_CLIENT_SECRET = ""
	SPOTIFY_CLIENT_REDIRECT = ""
)


func GetAuthorizationUrl(c *gin.Context) {
	
	authorizationResponse, err := spotify.GetAuthorizationUrl(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_CLIENT_REDIRECT)

	if err != nil {
		c.JSON(http.StatusBadRequest, &models.SpotifyErrorResponse{
			Error: models.SpotifyErrorObjectResponse{
				Status: http.StatusBadRequest,
				Message: "there was a problem with getting the authorization url",
			},
		})
		return
	}

	c.JSON(http.StatusOK, authorizationResponse)

}