package controllers

import (
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/mymixtape-api/config"
	"github.com/mymixtape-api/middleware"
	"github.com/mymixtape-api/models"
	"github.com/mymixtape-api/services"
)

func GetAuthorizationUrl(c *gin.Context) {

	authorizationUrlResponse, errorResponse := services.GetAuthorizationUrl(config.SPOTIFY_CLIENT_ID, config.SPOTIFY_CLIENT_SECRET, config.SPOTIFY_CLIENT_REDIRECT)

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

	session := sessions.Default(c)
	sessionToken, _ := middleware.GetTokenFromSession(session)

	if sessionToken != nil {
		c.JSON(http.StatusOK, &models.AccessTokenResponse{Token: sessionToken.Token, ExpiresIn: sessionToken.ExpiresIn})
		return
	}

	var accessTokenRequest models.AccessTokenRequest

	if err := c.BindJSON(&accessTokenRequest); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	accessTokenResponse, errorResponse := services.GetAccessToken(accessTokenRequest.Code, config.SPOTIFY_CLIENT_ID, config.SPOTIFY_CLIENT_SECRET, config.SPOTIFY_CLIENT_REDIRECT)

	if errorResponse != nil {
		c.JSON(http.StatusBadRequest, errorResponse.Message)
		return
	}

	middleware.SetTokenInSession(session, accessTokenResponse.Token, accessTokenResponse.ExpiresIn)

	c.JSON(http.StatusOK, accessTokenResponse)
}