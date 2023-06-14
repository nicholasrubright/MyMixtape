package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mymixtape-api/client"
	"github.com/mymixtape-api/client/models"
)

const (
	tokenKey = "X-MyMixtape-Token"
)

var (
	SPOTIFY_CLIENT_ID = ""
	SPOTIFY_CLIENT_SECRET = ""
	SPOTIFY_CLIENT_REDIRECT = ""
)


func GetAuthorizationUrl(c *gin.Context) {
	clientAuthorizationUrlResponse, clientErrorResponse := client.GetAuthorizationUrl(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_CLIENT_REDIRECT)

	if clientErrorResponse != nil {
		c.JSON(clientErrorResponse.Status, clientErrorResponse)
		return
	}


	c.JSON(http.StatusOK, clientAuthorizationUrlResponse)
}

func GetAccessToken(c *gin.Context) {

	var clientAccessTokenRequest models.ClientAccessTokenRequest

	if err := c.BindJSON(&clientAccessTokenRequest); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	clientAccessTokenResponse, clientErrorResponse := client.GetAccessToken(clientAccessTokenRequest.Code, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_CLIENT_REDIRECT)

	if clientErrorResponse != nil {
		c.JSON(clientErrorResponse.Status, clientErrorResponse)
		return
	}

	c.JSON(http.StatusOK, clientAccessTokenResponse)
}
