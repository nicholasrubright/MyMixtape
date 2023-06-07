package server

import (
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/mymixtape-api/client"
	"github.com/mymixtape-api/client/models"
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


	session := sessions.Default(c)
	tokenValue := session.Get("token")
	if tokenValue != nil {
		c.JSON(http.StatusOK, &models.ClientAuthorizationUrlResponse{
			Url: clientAuthorizationUrlResponse.Url,
			ValidToken: true,
		})

		return
	} else {
		c.JSON(http.StatusOK, clientAuthorizationUrlResponse)
	}
}

func GetAccessToken(c *gin.Context) {

	var clientAccessTokenRequest models.ClientAccessTokenRequest

	if err := c.BindJSON(&clientAccessTokenRequest); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}


	session := sessions.Default(c)
	var token string
	tokenValue := session.Get("token")
	if tokenValue == nil {
		token = ""
	} else {
		token = tokenValue.(string)
		c.JSON(http.StatusOK, &models.ClientAccessTokenResponse{
			Token: token,
			ExpiresIn: 0,
		})

		return
	}

	clientAccessTokenResponse, clientErrorResponse := client.GetAccessToken(clientAccessTokenRequest.Code, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_CLIENT_REDIRECT, token)

	if clientErrorResponse != nil {
		c.JSON(clientErrorResponse.Status, clientErrorResponse.Message)
		return
	}

	session.Set("token", clientAccessTokenResponse.Token)
	session.Save()

	c.JSON(http.StatusOK, clientAccessTokenResponse)
}
