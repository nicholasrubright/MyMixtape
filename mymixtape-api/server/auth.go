package server

import (
	"net/http"
	"fmt"

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


	fmt.Println("CLEINT: ", SPOTIFY_CLIENT_ID)


	clientAuthorizationUrlResponse, clientErrorResponse := client.GetAuthorizationUrl(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_CLIENT_REDIRECT)

	if clientErrorResponse != nil {
		c.JSON(clientErrorResponse.Status, clientErrorResponse)
		return
	}

	c.JSON(http.StatusOK, clientAuthorizationUrlResponse)

}
