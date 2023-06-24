package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/mymixtape-api/client"
	"github.com/mymixtape-api/client/models"
)

func GetCurrentUsersPlaylists(c *gin.Context) {

	token := c.GetHeader("Authorization")

	var limit string
	var offset string

	var clientGetCurrentUsersPlaylistsRequestQueryParameters models.ClientGetCurrentUsersPlaylistsRequestQueryParameters
	
	if c.Bind(&clientGetCurrentUsersPlaylistsRequestQueryParameters) == nil {
		limit = clientGetCurrentUsersPlaylistsRequestQueryParameters.Limit
		offset = clientGetCurrentUsersPlaylistsRequestQueryParameters.Offset

		if limit == "" {
			limit = "20"
		}

		if offset == "" {
			offset = "0"
		}

	} else {
		limit = "20"
		offset = "0"
	}


	clientCurrentUsersPlaylistsResponse, clientErrorResponse := client.GetCurrentUsersPlaylists(token, offset, limit)

	if clientErrorResponse != nil {
		c.JSON(clientErrorResponse.Status, clientErrorResponse)
		return
	}

	c.JSON(http.StatusOK, clientCurrentUsersPlaylistsResponse)
}

func CombinePlaylists(c *gin.Context) {

	token := c.GetHeader("Authorization")

	var clientCombinePlaylistRequest models.ClientCombinePlaylistRequest

	if err := c.ShouldBindWith(&clientCombinePlaylistRequest, binding.FormPost); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	clientCombineResponse, clientErrorResponse := client.CombinePlaylists(clientCombinePlaylistRequest.UserID, clientCombinePlaylistRequest.Name, clientCombinePlaylistRequest.Description, clientCombinePlaylistRequest.PlaylistIDs, token)

	if clientErrorResponse != nil {
		c.JSON(clientErrorResponse.Status, clientErrorResponse.Message)
		return
	}

	c.JSON(http.StatusCreated, clientCombineResponse)
}