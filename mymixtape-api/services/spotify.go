package services

import (
	"net/http"
	"net/url"
	"strconv"

	"github.com/mymixtape-api/internal"
	"github.com/mymixtape-api/models"
	"github.com/mymixtape-api/utils"
)

const (
	RESPONSE_TYPE = "code"
	SHOW_DIALOG = "true"
	SCOPE = "user-read-private user-read-email playlist-modify-public playlist-modify-private"
	TRACK_FIELDS = "href,limit,next,offset,previous,total,items(track(name,id))"
	SPOTIFY_AUTHORIZATION_URL = "https://accounts.spotify.com/authorize"
)

var (
	REQUEST_MANAGER = internal.NewRequestManager(http.DefaultClient)
)

// Authorization Endpoints
func GetAuthorizationUrl(client_id string, client_secret string, redirect_uri string) (*models.AuthorizationUrlResponse, *models.ErrorResponse) {

	state := utils.GenerateAuthorizationState()

	parameters := url.Values{
		"client_id": {client_id},
		"response_type": {RESPONSE_TYPE},
		"redirect_uri": {redirect_uri},
		"scope": {SCOPE},
		"state": {state},
		"show_dialog": {SHOW_DIALOG},
	}

	authorizationUrl := utils.GenerateAuthorizationUrl(SPOTIFY_AUTHORIZATION_URL, parameters)

	return &models.AuthorizationUrlResponse{
		Url: authorizationUrl,
	}, nil
}


func GetAccessToken(code string, client_id string, client_secret, redirect_uri string) (*models.AccessTokenResponse, *models.ErrorResponse) {
	
	if err := REQUEST_MANAGER.SetToken(code, redirect_uri, client_id, client_secret); err != nil {
		return nil, &models.ErrorResponse{
			Message: err.Error(),
			Status: http.StatusInternalServerError,
		}
	}

	return &models.AccessTokenResponse{
		Token: REQUEST_MANAGER.Token,
	}, nil
}

// User Endpoints
func GetCurrentUsersProfile(token string) (*models.CurrentUsersProfileResponse, *models.ErrorResponse) {

	var spotifyCurrentUsersProfileResponse *models.SpotifyCurrentUsersProfileResponse

	if err := REQUEST_MANAGER.GetInto("/me", &spotifyCurrentUsersProfileResponse, token); err != nil {
		return nil, &models.ErrorResponse{
			Status: http.StatusInternalServerError,
			Message: err.Error(),
		}
	}

	return &models.CurrentUsersProfileResponse {
		ID: spotifyCurrentUsersProfileResponse.ID,
		Name: spotifyCurrentUsersProfileResponse.DisplayName,
		Images: spotifyCurrentUsersProfileResponse.Images,
	}, nil
}


// Playlist Endpoints
// will need to add parameters for limit and offset for paginations
func GetCurrentUsersPlaylists(token string, offset string, limit string) (*models.CurrentUsersPlaylistsResponse, *models.ErrorResponse) {

	var spotifyCurrentUsersPlaylistsResponse *models.SpotifyCurrentUsersPlaylistsResponse

	parameters := url.Values{
		"offset": {offset},
		"limit": {limit},
	}

	endpoint := "/me/playlists?" + parameters.Encode()

	if err := REQUEST_MANAGER.GetInto(endpoint, &spotifyCurrentUsersPlaylistsResponse, token); err != nil {
		return nil, &models.ErrorResponse{
			Status: http.StatusInternalServerError,
			Message: err.Error(),
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

/* Combine Playlists
*	1. Get the track ids from the selected playlists
*	2. Create the playlist with the name and description
*	3. Add tracks to the newly created playlist  
*/

// Get the track ids from the selected playlists
func GetPlaylistTracks(playlist_id string, token string) (*models.SpotifyPlaylistItemsResponse, *models.ErrorResponse) {
	
	var spotifyPlaylistItemsResponse *models.SpotifyPlaylistItemsResponse

	parameters := url.Values{
		"fields": {TRACK_FIELDS},
		"limit": {strconv.Itoa(50)},
	}

	api_endpoint := "/playlists/" + playlist_id + "/tracks?" + string(parameters.Encode())


	if err := REQUEST_MANAGER.GetInto(api_endpoint, &spotifyPlaylistItemsResponse, token); err != nil {
		return nil, &models.ErrorResponse{
			Message: err.Error(),
			Status: http.StatusInternalServerError,
		}
	}


	for spotifyPlaylistItemsResponse.Total >= len(spotifyPlaylistItemsResponse.Items) {

		if spotifyPlaylistItemsResponse.Next == "" {
			break
		}


		var nextSpotifyPlaylistItemsResponse *models.SpotifyPlaylistItemsResponse

		parameters := url.Values{
			"offset": {strconv.Itoa(len(spotifyPlaylistItemsResponse.Items))},
			"fields": {TRACK_FIELDS},
		}

		endpoint := "/playlists/" + playlist_id + "/tracks?" + string(parameters.Encode())


		if err := REQUEST_MANAGER.GetInto(endpoint, &nextSpotifyPlaylistItemsResponse, token); err != nil {
			return nil, &models.ErrorResponse{
				Status: http.StatusInternalServerError,
				Message: err.Error(),
			}
			
		}

		spotifyPlaylistItemsResponse.Items = append(spotifyPlaylistItemsResponse.Items, nextSpotifyPlaylistItemsResponse.Items...)
	}


	
	return spotifyPlaylistItemsResponse, nil
}

// Create the playlist with the name and description
func CreatePlaylist(user_id string, playlist_name string, playlist_description string, token string) (*models.CreatePlaylistResponse, *models.ErrorResponse) {
	
	spotifyCreatePlaylistRequest := &models.SpotifyCreatePlaylistRequest{
		Name: playlist_name,
		Description: playlist_description,
	}

	var spotifyCreatePlaylistResponse *models.SpotifyCreatePlaylistResponse

	if err := REQUEST_MANAGER.PostInto("/users/" + user_id + "/playlists", &spotifyCreatePlaylistRequest, &spotifyCreatePlaylistResponse, token); err != nil {
		return nil, &models.ErrorResponse{
			Status: http.StatusInternalServerError,
			Message: err.Error(),
		}
	}

	return &models.CreatePlaylistResponse{
		ID: spotifyCreatePlaylistResponse.ID,
		Name: spotifyCreatePlaylistResponse.Name,
	}, nil
}

// Add tracks to the newly created playlist
func AddTracksToPlaylist(playlist_id string, track_ids []string, token string) *models.ErrorResponse {
	
	spotifyAddTracksToPlaylistRequest := &models.SpotifyAddItemsToPlaylistRequest{
		URIs: track_ids,
		Position: 0,
	}

	var spotifyAddTracksToPlaylistResponse *models.SpotifyAddItemsToPlaylistResponse

	if err := REQUEST_MANAGER.PostInto("/playlists/" + playlist_id + "/tracks", &spotifyAddTracksToPlaylistRequest, &spotifyAddTracksToPlaylistResponse, token); err != nil {
		
		return &models.ErrorResponse{
			Status: http.StatusInternalServerError,
			Message: err.Error(),
		}
	}

	return nil
}

func CombinePlaylists(user_id string, playlist_name string, playlist_description string, playlist_ids []string, token string) (*models.CombinePlaylistResponse, *models.ErrorResponse) {

	// Create Playlist
	createPlaylistResponse, errorResponse := CreatePlaylist(user_id, playlist_name, playlist_description, token)

	if errorResponse != nil {
		return nil, &models.ErrorResponse{
			Message: errorResponse.Message,
			Status: errorResponse.Status,
		}
	}

	var selectedPlaylistsTrackList []string
	selectedPlaylistsTrackList = make([]string, 0)

	for _, playlist_id := range playlist_ids {
		playlistItemsResponse, errorResponse := GetPlaylistTracks(playlist_id, token)

		if errorResponse != nil {
			continue
		}

		tracks := utils.NewPlaylistTracks(playlistItemsResponse)

		for _, track := range tracks.Tracks {
			selectedPlaylistsTrackList = append(selectedPlaylistsTrackList, utils.GetSpotifyTrackURI((track.ID)))
		}
	}

	errorResponse = AddTracksToPlaylist(createPlaylistResponse.ID, selectedPlaylistsTrackList, token)

	if errorResponse != nil {
		return nil, &models.ErrorResponse{
			Status: errorResponse.Status,
			Message: errorResponse.Message,
		}
	}

	return &models.CombinePlaylistResponse{
		ID: createPlaylistResponse.ID,
		Name: createPlaylistResponse.Name,
	}, nil

}