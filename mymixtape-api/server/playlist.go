package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mymixtape-api/client"
	"github.com/mymixtape-api/client/models"
)

func GetCurrentUsersPlaylists(c *gin.Context) {

	token := c.GetHeader(tokenKey)

	var offset string
	var limit string

	offset, ok := c.GetQuery("offset")
	if !ok {
		offset = "0"
	}

	limit, ok = c.GetQuery("limit")

	if !ok {
		limit = "20"
	}

	clientCurrentUsersPlaylistsResponse, clientErrorResponse := client.GetCurrentUsersPlaylists(token, offset, limit)

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

	clientCombineResponse, clientErrorResponse := client.CombinePlaylists(clientCombinePlaylistRequest.UserID, clientCombinePlaylistRequest.Name, clientCombinePlaylistRequest.Description, clientCombinePlaylistRequest.PlaylistIDs, token)

	if clientErrorResponse != nil {
		c.JSON(clientErrorResponse.Status, clientErrorResponse.Message)
		return
	}

	c.JSON(http.StatusCreated, clientCombineResponse)
}