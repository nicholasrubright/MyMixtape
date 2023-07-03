package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mymixtape-api/services"
)

func GetCurrentUsersProfile(c *gin.Context) {

	token := c.GetHeader("Authorization")

	currentUsersProfileResponse, errorResponse := services.GetCurrentUsersProfile(token)

	if errorResponse != nil {
		c.JSON(errorResponse.Error.Status, errorResponse)
		return
	}

	c.JSON(http.StatusOK, currentUsersProfileResponse)
}