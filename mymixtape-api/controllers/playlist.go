package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"

	"github.com/mymixtape-api/models"
)

func GetCurrentUsersPlaylists(c *gin.Context) {

	token := c.MustGet("token").(string)

	var limit string
	var offset string

	var getCurrentUsersPlaylistsRequestQueryParameters models.GetCurrentUsersPlaylistsRequestQueryParameters
	
	if c.Bind(&getCurrentUsersPlaylistsRequestQueryParameters) == nil {
		limit = getCurrentUsersPlaylistsRequestQueryParameters.Limit
		offset = getCurrentUsersPlaylistsRequestQueryParameters.Offset

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

	currentUsersPlaylistsResponse, errorResponse := Spotify.GetCurrentUserPlaylists(token, offset, limit)

	if errorResponse != nil {
		c.JSON(errorResponse.Status, errorResponse)
		return
	}

	c.JSON(http.StatusOK, currentUsersPlaylistsResponse)
}

func CombinePlaylists(c *gin.Context) {

	token := c.MustGet("token").(string)

	var combinePlaylistRequest models.CombinePlaylistRequest

	if err := c.ShouldBindWith(&combinePlaylistRequest, binding.FormPost); err != nil {
		c.JSON(http.StatusBadRequest, &models.ErrorResponse{
			Status: http.StatusBadRequest,
			Message: err.Error(),
		})
		return
	}

	errorResponse := Mixer.CombinePlaylists(combinePlaylistRequest.UserID, combinePlaylistRequest.Name, combinePlaylistRequest.Description, combinePlaylistRequest.PlaylistIDs, token)

	if errorResponse  != nil {
		c.JSON(errorResponse.Status, errorResponse)
		return
	}

	c.JSON(http.StatusCreated, nil)
}