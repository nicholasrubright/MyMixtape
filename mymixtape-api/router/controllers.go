package router

import (
	"net/http"
	"time"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/mymixtape-api/config"
	"github.com/mymixtape-api/middleware"
	"github.com/mymixtape-api/models"
	"github.com/mymixtape-api/services"
)

type Services struct {
	Spotify services.ISpotify
	Mixer services.IMixer
}

func NewServices() *Services {
	spotify, mixer := initServices()
	return &Services{
		Spotify: spotify,
		Mixer: mixer,
	}
}

func initServices() (services.Spotify, services.Mixer) {
	spotify := services.NewSpotify(config.SPOTIFY_CLIENT_ID, config.SPOTIFY_CLIENT_SECRET, config.SPOTIFY_CLIENT_REDIRECT)
	mixer := services.NewMixer(spotify)
	return spotify, mixer
}


func (s *Services) GetAuthorizationUrl(c *gin.Context) {

	authorizationUrlResponse, errorResponse := s.Spotify.GetAuthorizationUrl()

	if errorResponse != nil {
		c.JSON(errorResponse.Status, &models.ErrorResponse{
			Message: errorResponse.Message,
			Status:  errorResponse.Status,
		})
		return
	}

	c.JSON(http.StatusOK, authorizationUrlResponse)
}

func (s *Services) GetAccessToken(c *gin.Context) {

	session := sessions.Default(c)
	sessionToken, _ := middleware.GetTokenFromSession(session)

	if sessionToken != nil {

		tokenExpiresTime := sessionToken.Expires
		timeNow := time.Now()

		if tokenExpiresTime.Before(timeNow) {
			c.JSON(http.StatusNoContent, nil)
			return
		}
	}

	var accessTokenRequest *models.AccessTokenRequest

	if err := c.BindJSON(&accessTokenRequest); err != nil {
		c.JSON(http.StatusBadRequest, &models.ErrorResponse{
			Message: err.Error(),
			Status:  http.StatusBadRequest,
		})
		return
	}

	if sessionToken != nil {

		if accessTokenRequest.Code == sessionToken.Code {
			c.JSON(http.StatusNoContent, nil)
			return
		}

	}

	accessTokenResponse, errorResponse := s.Spotify.GetAccessToken(accessTokenRequest.Code)

	if errorResponse != nil {
		c.JSON(http.StatusBadRequest, &models.ErrorResponse{
			Message: errorResponse.Message,
			Status:  errorResponse.Status,
		})
		return
	}

	middleware.SetTokenInSession(session, accessTokenResponse.Token, accessTokenResponse.Expires, accessTokenRequest.Code)

	c.JSON(http.StatusNoContent, nil)
}


// Playlists

func (s *Services) GetCurrentUsersPlaylists(c *gin.Context) {

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

	currentUsersPlaylistsResponse, errorResponse := s.Spotify.GetCurrentUserPlaylists(token, offset, limit)

	if errorResponse != nil {
		c.JSON(errorResponse.Status, errorResponse)
		return
	}

	c.JSON(http.StatusOK, currentUsersPlaylistsResponse)
}

func (s *Services) CombinePlaylists(c *gin.Context) {

	token := c.MustGet("token").(string)

	var combinePlaylistRequest models.CombinePlaylistRequest

	if err := c.ShouldBindWith(&combinePlaylistRequest, binding.FormPost); err != nil {
		c.JSON(http.StatusBadRequest, &models.ErrorResponse{
			Status: http.StatusBadRequest,
			Message: err.Error(),
		})
		return
	}

	errorResponse := s.Mixer.CombinePlaylists(combinePlaylistRequest.UserID, combinePlaylistRequest.Name, combinePlaylistRequest.Description, combinePlaylistRequest.PlaylistIDs, token)

	if errorResponse  != nil {
		c.JSON(errorResponse.Status, errorResponse)
		return
	}

	c.JSON(http.StatusCreated, nil)
}

// Profile

func (s *Services) GetCurrentUsersProfile(c *gin.Context) {

	token := c.MustGet("token").(string)

	currentUsersProfileResponse, errorResponse := s.Spotify.GetCurrentUsersProfile(token)

	if errorResponse != nil {
		c.JSON(errorResponse.Status, errorResponse)
		return
	}

	c.JSON(http.StatusOK, currentUsersProfileResponse)
}