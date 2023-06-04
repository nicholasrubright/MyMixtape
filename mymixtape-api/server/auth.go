package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mymixtape-api/client"
)

var (
	SPOTIFY_CLIENT_ID = ""
	SPOTIFY_CLIENT_SECRET = ""
	SPOTIFY_CLIENT_REDIRECT = ""
)

var (
	CLIENT = NewRequestManager(http.DefaultClient)
)


func GetAuthorizationUrl(c *gin.Context) {

	clientAuthorizationUrlResponse, clientErrorResponse := client.GetAuthorizationUrl(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_CLIENT_REDIRECT)

	if clientErrorResponse != nil {
		c.JSON(clientErrorResponse.Status, clientErrorResponse)
		return
	}

	c.JSON(http.StatusOK, clientAuthorizationUrlResponse)

}
