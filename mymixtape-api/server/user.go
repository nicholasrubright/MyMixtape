package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mymixtape-api/client"
)

func GetCurrentUsersProfile(c *gin.Context) {

	token := c.GetHeader(tokenKey)

	clientCurrentUsersProfileResponse, clientErrorResponse := client.GetCurrentUsersProfile(token)

	if clientErrorResponse != nil {
		c.JSON(clientErrorResponse.Status, clientErrorResponse)
		return
	}

	c.JSON(http.StatusOK, clientCurrentUsersProfileResponse)
}