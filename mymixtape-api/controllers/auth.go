package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mymixtape-api/models"
	"github.com/mymixtape-api/services"
)

var (
	SPOTIFY_CLIENT_ID = ""
	SPOTIFY_CLIENT_SECRET = ""
	SPOTIFY_CLIENT_REDIRECT = ""
)

func GetAuthorizationUrl(c *gin.Context) {
	
	authorizationUrlResponse, errorResponse := services.GetAuthorizationUrl(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_CLIENT_REDIRECT)

	if errorResponse != nil {
		c.JSON(errorResponse.Status, &models.ErrorResponse{
			Message: errorResponse.Message,
			Status: errorResponse.Status,
		})
		return
	}

	c.JSON(http.StatusOK, authorizationUrlResponse)
}

func GetAccessToken(c *gin.Context) {

	var accessTokenRequest models.AccessTokenRequest

	if err := c.BindJSON(&accessTokenRequest); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	accessTokenResponse, errorResponse := services.GetAccessToken(accessTokenRequest.Code, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_CLIENT_REDIRECT)

	if errorResponse != nil {
		c.JSON(http.StatusBadRequest, errorResponse.Message)
		return
	}

	c.JSON(http.StatusOK, accessTokenResponse)
}