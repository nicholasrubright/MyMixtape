package controllers

import (
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/mymixtape-api/services"
)

func GetCurrentUsersProfile(c *gin.Context) {

	token := c.GetHeader("Authorization")

	currentUsersProfileResponse, errorResponse := services.GetCurrentUsersProfile(token)

	if errorResponse != nil {
		c.JSON(errorResponse.Status, errorResponse)
		return
	}

	c.JSON(http.StatusOK, currentUsersProfileResponse)
}

func TestProfile(c *gin.Context) {

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