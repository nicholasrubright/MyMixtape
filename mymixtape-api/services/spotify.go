package services

import (
	"fmt"
	"math/rand"
	"net/http"
	"net/url"
	"strconv"
	"strings"

	"github.com/mymixtape-api/constants"
	"github.com/mymixtape-api/internal"
	"github.com/mymixtape-api/models"
)

type ISpotify interface {
	GetAuthorizationUrl() (*models.AuthorizationUrlResponse, *models.ErrorResponse)
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

func NewSpotify(client_id string, client_secret string, redirect_uri string) Spotify {
	return Spotify{
		Client: internal.New(http.DefaultClient),
		CLIENT_ID: client_id,
		CLIENT_SECRET: client_secret,
		REDIRECT_URI: redirect_uri,
	}
}

func (s Spotify) GetAuthorizationUrl() (*models.AuthorizationUrlResponse, *models.ErrorResponse) {
	state := generateAuthorizationState()

	parameters := url.Values{
		"client_id": {s.CLIENT_ID},
		"response_type": {constants.RESPONSE_TYPE},
		"redirect_uri": {s.REDIRECT_URI},
		"scope": {constants.SCOPE},
		"state": {state},
		"show_dialog": {constants.SHOW_DIALOG},
	}

	authorizationUrl := generateAuthorizationUrl(constants.SPOTIFY_AUTHORIZATION_URL, parameters)

	return &models.AuthorizationUrlResponse{
		Url: authorizationUrl,
	}, nil
}

func (s Spotify) GetAccessToken(code string) (*models.AccessTokenResponse, *models.ErrorResponse) {

	formData := url.Values{
		"grant_type": {constants.GRANT_TYPE},
		"code": {code},
		"redirect_uri": {s.REDIRECT_URI},
	}

	accessTokenResponse, errorResponse := s.Client.PostAccessToken(constants.TOKEN_URL, strings.NewReader(formData.Encode()), s.CLIENT_ID, s.CLIENT_SECRET)

	if errorResponse != nil {
		return nil, &models.ErrorResponse{
			Message: errorResponse.Message,
			Status: errorResponse.StatusCode,
		}
	}

	return accessTokenResponse, nil
}

func (s Spotify) GetCurrentUsersProfile(token string) (*models.CurrentUsersProfileResponse, *models.ErrorResponse) {

	var spotifyCurrentProfileResponse *models.SpotifyCurrentUsersProfileResponse

	if err := s.Client.GetInto("/me", &spotifyCurrentProfileResponse, token); err != nil {
		return nil, &models.ErrorResponse{
			Message: err.Message,
			Status: err.StatusCode,
		}
	}

	return &models.CurrentUsersProfileResponse{
		ID: spotifyCurrentProfileResponse.ID,
		Name: spotifyCurrentProfileResponse.DisplayName,
		Images: spotifyCurrentProfileResponse.Images,
	}, nil

}

func (s Spotify) GetCurrentUserPlaylists(token string, offset string, limit string) (*models.CurrentUsersPlaylistsResponse, *models.ErrorResponse) {

	var spotifyCurrentUsersPlaylistsResponse *models.SpotifyCurrentUsersPlaylistsResponse

	parameters := url.Values{
		"offset": {offset},
		"limit": {limit},
	}

	endpoint := "/me/playlists?" + parameters.Encode()

	if err := s.Client.GetInto(endpoint, &spotifyCurrentUsersPlaylistsResponse, token); err != nil {
		return nil, &models.ErrorResponse{
			Message: err.Message,
			Status: err.StatusCode,
		}
	}

	var items []struct {
		ID     string `json:"id"`
		Images []struct {
			URL    string `json:"url"`
			Height int    `json:"height"`
			Width  int    `json:"width"`
		} `json:"images"`
		Name  string `json:"name"`
	}

	items = make([]struct {
		ID     string `json:"id"`
		Images []struct {
			URL    string `json:"url"`
			Height int    `json:"height"`
			Width  int    `json:"width"`
		} `json:"images"`
		Name  string `json:"name"`
	}, 0)

	for _, spotifyItemResponse := range spotifyCurrentUsersPlaylistsResponse.Items {
		newClientItem := struct {
			ID     string `json:"id"`
			Images []struct {
				URL    string `json:"url"`
				Height int    `json:"height"`
				Width  int    `json:"width"`
			} `json:"images"`
			Name  string `json:"name"`
		}{
			ID: spotifyItemResponse.ID,
			Images: spotifyItemResponse.Images,
			Name: spotifyItemResponse.Name,
		}

		items = append(items, newClientItem)
	}


	return &models.CurrentUsersPlaylistsResponse {
		Href: spotifyCurrentUsersPlaylistsResponse.Href,
		Limit: spotifyCurrentUsersPlaylistsResponse.Limit,
		Next: spotifyCurrentUsersPlaylistsResponse.Next,
		Offset: spotifyCurrentUsersPlaylistsResponse.Offset,
		Previous: spotifyCurrentUsersPlaylistsResponse.Previous,
		Total: spotifyCurrentUsersPlaylistsResponse.Total,
		Items: items,
	}, nil


}

func (s Spotify) GetPlaylistTracks(playlist_id string, token string) (*models.SpotifyPlaylistItemsResponse, *models.ErrorResponse) {
	
	var spotifyPlaylistItemsResponse *models.SpotifyPlaylistItemsResponse

	parameters := url.Values{
		"fields": {constants.TRACK_FIELDS},
		"limit": {strconv.Itoa(50)},
	}

	api_endpoint := "/playlists/" + playlist_id + "/tracks?" + string(parameters.Encode())


	if err := s.Client.GetInto(api_endpoint, &spotifyPlaylistItemsResponse, token); err != nil {
		return nil, &models.ErrorResponse{
			Message: err.Message,
			Status: err.StatusCode,
		}
	}


	for spotifyPlaylistItemsResponse.Total >= len(spotifyPlaylistItemsResponse.Items) {

		if spotifyPlaylistItemsResponse.Next == "" {
			break
		}


		var nextSpotifyPlaylistItemsResponse *models.SpotifyPlaylistItemsResponse

		parameters := url.Values{
			"offset": {strconv.Itoa(len(spotifyPlaylistItemsResponse.Items))},
			"fields": {constants.TRACK_FIELDS},
		}

		endpoint := "/playlists/" + playlist_id + "/tracks?" + string(parameters.Encode())


		if err := s.Client.GetInto(endpoint, &nextSpotifyPlaylistItemsResponse, token); err != nil {
			return nil, &models.ErrorResponse{
				Message: err.Message,
				Status: err.StatusCode,
			}
			
		}

		spotifyPlaylistItemsResponse.Items = append(spotifyPlaylistItemsResponse.Items, nextSpotifyPlaylistItemsResponse.Items...)
	}


	
	return spotifyPlaylistItemsResponse, nil
}

func (s Spotify) CreatePlaylist(user_id string, playlist_name string, playlist_description string, token string) (*models.CreatePlaylistResponse, *models.ErrorResponse) {
	
	spotifyCreatePlaylistRequest := &models.SpotifyCreatePlaylistRequest{
		Name: playlist_name,
		Description: playlist_description,
	}

	var spotifyCreatePlaylistResponse *models.SpotifyCreatePlaylistResponse

	if err := s.Client.PostInto("/users/" + user_id + "/playlists", &spotifyCreatePlaylistRequest, &spotifyCreatePlaylistResponse, token); err != nil {
		return nil, &models.ErrorResponse{
			Message: err.Message,
			Status: err.StatusCode,
		}
	}

	return &models.CreatePlaylistResponse{
		ID: spotifyCreatePlaylistResponse.ID,
		Name: spotifyCreatePlaylistResponse.Name,
	}, nil
}

func (s Spotify) AddTracksToPlaylist(token string, id string, tracks []string) *models.ErrorResponse {
	
	spotifyAddTracksToPlaylistRequest := &models.SpotifyAddItemsToPlaylistRequest{
		URIs: tracks,
		Position: 0,
	}

	var spotifyAddTracksToPlaylistResponse *models.SpotifyAddItemsToPlaylistResponse

	if err := s.Client.PostInto("/playlists/" + id + "/tracks", &spotifyAddTracksToPlaylistRequest, &spotifyAddTracksToPlaylistResponse, token); err != nil {
		
		return &models.ErrorResponse{
			Message: err.Message,
			Status: err.StatusCode,
		}
	}

	return nil
}

func (s Spotify) DeletePlaylist(token string, id string) *models.ErrorResponse {
	return nil
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
// func getSpotifyApiUrl(endpoint string) string {
// 	return fmt.Sprintf("%v://%v/%v/%v", constants.SCHEME, constants.HOST, constants.VERSION, endpoint)
// }

// func getSpotifyTrackURI(track_id string) string {
// 	return "spotify:track:" + track_id
// }

// func newPlaylistTracks(playlistItemsResponse *models.SpotifyPlaylistItemsResponse) *internal.PlaylistTracks {
// 	var tracks []struct {
// 		ID	string	`json:"id"`
// 	}

// 	tracks = make([]struct { ID string `json:"id"`}, 0)

// 	for _, playlistItem := range playlistItemsResponse.Items {
// 		tracks = append(tracks, struct{ID string "json:\"id\""}{
// 			playlistItem.Track.ID,
// 		})
// 	}

// 	return &internal.PlaylistTracks{
// 		Tracks: tracks,
// 	}
// }