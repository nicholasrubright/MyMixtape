package client

import (
	"net/http"
	"strings"

	"github.com/mymixtape-api/client/models"
	"github.com/mymixtape-api/spotify"
	"github.com/mymixtape-api/utils"
)

func GetAuthorizationUrl(client_id string, client_secret string, redirect_uri string) (*models.ClientAuthorizationUrlResponse, *models.ClientErrorResponse) {

	spotifyAuthorzationUrlResponse, spotifyErrorResponse := spotify.GetAuthorizationUrl(client_id, client_secret, redirect_uri)

	if spotifyErrorResponse != nil {
		return nil, &models.ClientErrorResponse{
			Message: spotifyErrorResponse.Error.Message,
			Status: spotifyErrorResponse.Error.Status,
		}
	}

	return &models.ClientAuthorizationUrlResponse{
		Url: spotifyAuthorzationUrlResponse.Url,
		ValidToken: false,
	}, nil
}

func GetAccessToken(code string, client_id string, client_secret string, redirect_uri string) (*models.ClientAccessTokenResponse, *models.ClientErrorResponse) {
	spotifyAccessTokenResponse, spotifyErrorResponse := spotify.GetAccessToken(code, client_id, client_secret, redirect_uri)

	if spotifyErrorResponse != nil {
		return nil, &models.ClientErrorResponse{
			Message: spotifyErrorResponse.Description,
			Status: http.StatusBadRequest,
		}
	}

	return &models.ClientAccessTokenResponse{
		Token: spotifyAccessTokenResponse.AccessToken,
		ExpiresIn: spotifyAccessTokenResponse.ExpiresIn,
	}, nil
}

// User Profile
func GetCurrentUsersProfile(token string) (*models.ClientCurrentUsersProfileResponse, *models.ClientErrorResponse) {

	spotifyCurrentUsersProfileResponse, spotifyErrorResponse := spotify.GetCurrentUsersProfile(token)

	if spotifyErrorResponse != nil {
		return nil, &models.ClientErrorResponse{
			Message: spotifyErrorResponse.Error.Message,
			Status: spotifyErrorResponse.Error.Status,
		}
	}

	return &models.ClientCurrentUsersProfileResponse{
		ID: spotifyCurrentUsersProfileResponse.ID,
		Name: spotifyCurrentUsersProfileResponse.DisplayName,
		Images: spotifyCurrentUsersProfileResponse.Images,
	}, nil

}


// User Playlists
func GetCurrentUsersPlaylists(token string, offset string, limit string) (*models.ClientCurrentUsersPlaylistsResponse, *models.ClientErrorResponse) {
	spotifyCurrentUsersPlaylistsResponse, spotifyErrorResponse := spotify.GetCurrentUsersPlaylists(token, offset, limit)

	if spotifyErrorResponse != nil {
		return nil, &models.ClientErrorResponse{
			Message: spotifyErrorResponse.Error.Message,
			Status: spotifyErrorResponse.Error.Status,
		}
	}

	var clientItems []struct {
		ID     string `json:"id"`
		Images []struct {
			URL    string `json:"url"`
			Height int    `json:"height"`
			Width  int    `json:"width"`
		} `json:"images"`
		Name  string `json:"name"`
	}

	clientItems = make([]struct {
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

		clientItems = append(clientItems, newClientItem)
	}


	return &models.ClientCurrentUsersPlaylistsResponse{
		Href: spotifyCurrentUsersPlaylistsResponse.Href,
		Limit: spotifyCurrentUsersPlaylistsResponse.Limit,
		Next: spotifyCurrentUsersPlaylistsResponse.Next,
		Offset: spotifyCurrentUsersPlaylistsResponse.Offset,
		Previous: spotifyCurrentUsersPlaylistsResponse.Previous,
		Total: spotifyCurrentUsersPlaylistsResponse.Total,
		Items: clientItems,
	}, nil
}

func CombinePlaylists(user_id string, playlist_name string, playlist_description string, playlist_ids string, token string) (*models.ClientCombinePlaylistResponse, *models.ClientErrorResponse) {

	playlistIds := strings.Split(playlist_ids, ",")


	// Create the playlist
	spotifyCreatePlaylistResponse, spotifyErrorResponse := spotify.CreatePlaylist(user_id, playlist_name, playlist_description, token)

	if spotifyErrorResponse != nil {
		return nil, &models.ClientErrorResponse{
			Message: spotifyErrorResponse.Error.Message,
			Status: spotifyErrorResponse.Error.Status,
		}
	}


	// Getting the Playlist Tracks IDs
	var clientSelectedPlaylistsTrackList []string
	clientSelectedPlaylistsTrackList = make([]string, 0)

	for _, playlist_id := range playlistIds {

		spotifyPlaylistItemsResponse, spotifyErrorResponse := spotify.GetPlaylistTracks(playlist_id,  token)

		if spotifyErrorResponse != nil {
			// probably want to mark that a playlist didn't work
			continue
		}

		tracks := models.NewPlaylistTracks(spotifyPlaylistItemsResponse)

		for _, track := range tracks.Tracks {
			clientSelectedPlaylistsTrackList = append(clientSelectedPlaylistsTrackList, utils.GetSpotifyTrackURI(track.ID))
		}

	}

	// Add Tracks to the newly created playlist
	_, spotifyErrorResponse = spotify.AddTracksToPlaylist(spotifyCreatePlaylistResponse.ID, clientSelectedPlaylistsTrackList, token)

	if spotifyErrorResponse != nil {
		return nil, &models.ClientErrorResponse{
			Status: spotifyErrorResponse.Error.Status,
			Message: spotifyErrorResponse.Error.Message,
		}
	}

	return &models.ClientCombinePlaylistResponse{
		ID: spotifyCreatePlaylistResponse.ID,
		Name: spotifyCreatePlaylistResponse.Name,
	}, nil

}