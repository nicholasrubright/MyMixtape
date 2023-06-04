package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mymixtape-api/client"
)

func GetCurrentUsersProfile(c *gin.Context) {
	clientCurrentUsersProfileResponse, clientErrorResponse := client.GetCurrentUsersProfile()

	if clientErrorResponse != nil {
		c.JSON(clientErrorResponse.Status, clientErrorResponse)
		return
	}

	c.JSON(http.StatusOK, clientCurrentUsersProfileResponse)
}