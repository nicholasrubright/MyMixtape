package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mymixtape-api/client"
	"github.com/mymixtape-api/client/models"
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

func CombinePlaylists(c *gin.Context) {

	token := c.GetHeader(tokenKey)

	var clientCombinePlaylistRequest models.ClientCombinePlaylistRequest

	if err := c.BindJSON(&clientCombinePlaylistRequest); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	clientErrorResponse := client.CombinePlaylists(clientCombinePlaylistRequest.UserID, clientCombinePlaylistRequest.Name, clientCombinePlaylistRequest.Description, clientCombinePlaylistRequest.PlaylistIDs, token)

	if clientErrorResponse != nil {
		c.JSON(clientErrorResponse.Status, clientErrorResponse.Message)
		return
	}

	c.Done()
}