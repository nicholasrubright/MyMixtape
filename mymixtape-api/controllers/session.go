package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/mymixtape-api/config"
	"github.com/mymixtape-api/middleware"
	"github.com/mymixtape-api/models"
	"github.com/mymixtape-api/services"
)

func GetSession(c *gin.Context) {

	session := sessions.Default(c)
	var count int
	v := session.Get("count")
	if v == nil {
		count = 0
	} else {
		count = v.(int)
		count++
	}

	session.Set("count", count)
	session.Save()

	c.JSON(http.StatusOK, gin.H{"count": count})
}

func SetToken(c *gin.Context) {
	session := sessions.Default(c)


	sessionToken, _ := middleware.GetTokenFromSession(session)

	if sessionToken != nil {
		c.JSON(http.StatusOK, &models.AccessTokenResponse{Token: sessionToken.Token, ExpiresIn: 0})
		return
	}

	var accessTokenRequest models.AccessTokenRequest

	if err := c.BindJSON(&accessTokenRequest); err != nil {
		fmt.Println("bind json err: ", err)
		c.JSON(http.StatusBadRequest, &models.ErrorResponse{
			Message: err.Error(),
			Status: http.StatusBadRequest,
		})
		return
	}

	accessTokenResponse, errorResponse := services.GetAccessToken(accessTokenRequest.Code, config.SPOTIFY_CLIENT_ID, config.SPOTIFY_CLIENT_SECRET, config.SPOTIFY_CLIENT_REDIRECT)

	if errorResponse != nil {
		c.JSON(http.StatusBadRequest, &models.ErrorResponse{
			Message: errorResponse.Message,
			Status: errorResponse.Status,
		})
		return
	}


	middleware.SetTokenInSession(session, accessTokenResponse.Token, accessTokenResponse.ExpiresIn)

	c.JSON(http.StatusOK, accessTokenResponse)

}

func GetToken(c *gin.Context) {

	token := c.MustGet("token").(string)

	c.JSON(http.StatusOK, gin.H{"token": token})

}