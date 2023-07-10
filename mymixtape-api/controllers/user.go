package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mymixtape-api/services"
)

func GetCurrentUsersProfile(c *gin.Context) {

	token := c.MustGet("token").(string)

	currentUsersProfileResponse, errorResponse := services.GetCurrentUsersProfile(token)

	if errorResponse != nil {
		c.JSON(errorResponse.Status, errorResponse)
		return
	}

	c.JSON(http.StatusOK, currentUsersProfileResponse)
}