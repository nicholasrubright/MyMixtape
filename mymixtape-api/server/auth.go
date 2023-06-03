package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)


func GetAuthorizationUrl(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, "hello")
}