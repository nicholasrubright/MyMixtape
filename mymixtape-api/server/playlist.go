package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mymixtape-api/client"
)

func GetCurrentUsersPlaylists(c *gin.Context) {

	token := c.GetHeader(tokenKey)

	clientCurrentUsersPlaylistsResponse, clientErrorResponse := client.GetCurrentUsersPlaylists(token)

	if clientErrorResponse != nil {
		c.JSON(clientErrorResponse.Status, clientErrorResponse)
		return
	}

	c.JSON(http.StatusOK, clientCurrentUsersPlaylistsResponse)
}