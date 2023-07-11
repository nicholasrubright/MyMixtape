package services

import (
	"fmt"
	"math/rand"
	"net/http"
	"net/url"

	"github.com/mymixtape-api/config"
	"github.com/mymixtape-api/constants"
	"github.com/mymixtape-api/internal"
	"github.com/mymixtape-api/models"
)

type ISpotify interface {
	GetAuthorization() (*models.AuthorizationUrlResponse, *models.ErrorResponse)
	GetAccessToken(code string) (*models.AccessTokenResponse, *models.ErrorResponse)
	GetCurrentUsersProfile(token string) (*models.CurrentUsersProfileResponse, *models.ErrorResponse)
	GetCurrentUserPlaylists(token string, offset string, limit string) (*models.CurrentUsersPlaylistsResponse, *models.ErrorResponse)
	GetPlaylistTracks(token string, id string) (*models.SpotifyPlaylistItemsResponse, *models.ErrorResponse)
	CreatePlaylist(token string, user string, name string, description string) (*models.CreatePlaylistResponse, *models.ErrorResponse)
	AddTracksToPlaylist(token string, id string, tracks []string) *models.ErrorResponse
	DeletePlaylist(token string, id string) *models.ErrorResponse
}

type Spotify struct {
	Client			internal.Client
	CLIENT_ID		string
	CLIENT_SECRET	string
	REDIRECT_URI	string
}

func New() Spotify {
	return Spotify{
		Client: http.DefaultClient,
		CLIENT_ID: config.SPOTIFY_CLIENT_ID,
		CLIENT_SECRET: config.SPOTIFY_CLIENT_SECRET,
		REDIRECT_URI: config.SPOTIFY_CLIENT_REDIRECT,
	}
}

func (s Spotify) GetAuthorization() (*models.AuthorizationUrlResponse, *models.ErrorResponse) {
	state := GenerateAuthorizationState()

	parameters := url.Values{
		"client_id": {s.CLIENT_ID},
		"response_type": {RESPONSE_TYPE},
		"redirect_uri": {s.REDIRECT_URI},
		"scope": {SCOPE},
		"state": {state},
		"show_dialog": {SHOW_DIALOG},
	}

	authorizationUrl := GenerateAuthorizationUrl(SPOTIFY_AUTHORIZATION_URL, parameters)

	return &models.AuthorizationUrlResponse{
		Url: authorizationUrl,
	}, nil
}

func (s Spotify) GetAccessToken(code string) (*models.AccessTokenResponse, *models.ErrorResponse) {
	accessTokenResponse, errorResponse := s.GetAccessToken(code)

	if errorResponse != nil {
		return nil, &models.ErrorResponse{
			Message: errorResponse.Message,
			Status: errorResponse.Status,
		}
	}

	return accessTokenResponse, nil
}

func (s Spotify) GetCurrentUsersProfile(token string) (*models.CurrentUsersProfileResponse, *models.ErrorResponse) {

	var spotifyCurrentProfileResponse *models.SpotifyCurrentUsersProfileResponse

	

}


// Utility Functions

// Generate State for Spotify Api
func generateAuthorizationState() string {
	text := make([]rune, constants.STATE_LENGTH)
	for i := range text {
		text[i] = constants.CHARACTERS[rand.Intn(len(constants.CHARACTERS))]
	}

	return string(text)
}

func generateAuthorizationUrl(authorization_url string, parameters url.Values) string {
	return fmt.Sprintf("%v?%v", authorization_url, parameters.Encode())
}

// Creates the base API url
func getSpotifyApiUrl(endpoint string) string {
	return fmt.Sprintf("%v://%v/%v/%v", constants.SCHEME, constants.HOST, constants.VERSION, endpoint)
}

func getSpotifyTrackURI(track_id string) string {
	return "spotify:track:" + track_id
}

func newPlaylistTracks(playlistItemsResponse *models.SpotifyPlaylistItemsResponse) *internal.PlaylistTracks {
	var tracks []struct {
		ID	string	`json:"id"`
	}

	tracks = make([]struct { ID string `json:"id"`}, 0)

	for _, playlistItem := range playlistItemsResponse.Items {
		tracks = append(tracks, struct{ID string "json:\"id\""}{
			playlistItem.Track.ID,
		})
	}

	return &internal.PlaylistTracks{
		Tracks: tracks,
	}
}