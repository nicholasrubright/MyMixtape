package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mymixtape-api/client"
	"github.com/mymixtape-api/client/models"
)

func GetCurrentUsersPlaylists(c *gin.Context) {
	clientCurrentUsersPlaylistsResponse, clientErrorResponse := client.GetCurrentUsersPlaylists()

	if clientErrorResponse != nil {
		c.JSON(clientErrorResponse.Status, clientErrorResponse)
		return
	}

	c.JSON(http.StatusOK, clientCurrentUsersPlaylistsResponse)
}

func CombinePlaylists(c *gin.Context) {

	var clientCombinePlaylistRequest models.ClientCombinePlaylistRequest

	if err := c.BindJSON(&clientCombinePlaylistRequest); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	clientErrorResponse := client.CombinePlaylists(clientCombinePlaylistRequest.UserID, clientCombinePlaylistRequest.Name, clientCombinePlaylistRequest.Description, clientCombinePlaylistRequest.PlaylistIDs)

	if clientErrorResponse != nil {
		c.JSON(clientErrorResponse.Status, clientErrorResponse.Message)
		return
	}

	c.Done()
}