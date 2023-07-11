package controllers

import (
	"net/http"
	"time"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/mymixtape-api/middleware"
	"github.com/mymixtape-api/models"
	"github.com/mymixtape-api/services"
)


var (
	Spotify = services.NewSpotify()
	Mixer = services.NewMixer(Spotify)
)


func GetAuthorizationUrl(c *gin.Context) {

	authorizationUrlResponse, errorResponse := Spotify.GetAuthorizationUrl()

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

		tokenExpiresTime := sessionToken.Expires
		timeNow := time.Now()

		if tokenExpiresTime.Before(timeNow) {
			c.JSON(http.StatusNoContent, nil)
			return
		}
	}

	var accessTokenRequest models.AccessTokenRequest

	if err := c.BindJSON(&accessTokenRequest); err != nil {
		c.JSON(http.StatusBadRequest, &models.ErrorResponse{
			Message: err.Error(),
			Status: http.StatusBadRequest,
		})
		return
	}


	if sessionToken != nil {

		if accessTokenRequest.Code == sessionToken.Code {
			c.JSON(http.StatusNoContent, nil)
			return
		}

	}

	accessTokenResponse, errorResponse := Spotify.GetAccessToken(accessTokenRequest.Code)

	if errorResponse != nil {
		c.JSON(http.StatusBadRequest, &models.ErrorResponse{
			Message: errorResponse.Message,
			Status: errorResponse.Status,
		})
		return
	}

	middleware.SetTokenInSession(session, accessTokenResponse.Token, accessTokenResponse.Expires, accessTokenRequest.Code)

	c.JSON(http.StatusNoContent, nil)
}