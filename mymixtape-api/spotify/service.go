package spotify

import (
	"net/http"
	"net/url"

	"github.com/mymixtape-api/spotify/models"
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
	REQUEST_MANAGER = NewRequestManager(http.DefaultClient)
)

// Authorization Endpoints
func GetAuthorizationUrl(client_id string, client_secret string, redirect_uri string) (*models.SpotifyAuthorizationUrlResponse, *models.SpotifyErrorResponse) {

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

	return &models.SpotifyAuthorizationUrlResponse{
		Url: authorizationUrl,
	}, nil
}


func GetAccessToken(code string, client_id string, client_secret, redirect_uri string) (*models.SpotifyAccessTokenResponse, *models.SpotifyAuthenticationErrorResponse) {
	
	if err := REQUEST_MANAGER.SetToken(code, redirect_uri, client_id, client_secret); err != nil {
		utils.LogError("GetAccessToken", "Authentication Error")
		return nil, &models.SpotifyAuthenticationErrorResponse{
			Error: "AccessToken Error",
			Description: "There was a problem getting the access token",
		}
	}

	return &models.SpotifyAccessTokenResponse{
		AccessToken: REQUEST_MANAGER.Token,
		ExpiresIn: REQUEST_MANAGER.TokenExpires,
		TokenType: REQUEST_MANAGER.TokenType,
	}, nil
}

// User Endpoints
func GetCurrentUsersProfile(token string) (*models.SpotifyCurrentUsersProfileResponse, *models.SpotifyErrorResponse) {

	var spotifyCurrentUsersProfileResponse *models.SpotifyCurrentUsersProfileResponse

	if err := REQUEST_MANAGER.GetInto("/me", &spotifyCurrentUsersProfileResponse, token); err != nil {
		utils.LogError("GetCurrentUsersProfile", err.Error())
		return nil, &models.SpotifyErrorResponse{
			Error: models.SpotifyErrorObjectResponse{
				Status: http.StatusInternalServerError,
				Message: err.Error(),
			},
		}
	}

	return spotifyCurrentUsersProfileResponse, nil
}



// Playlist Endpoints
// will need to add parameters for limit and offset for paginations
func GetCurrentUsersPlaylists(token string) (*models.SpotifyCurrentUsersPlaylistsResponse, *models.SpotifyErrorResponse) {

	var spotifyCurrentUsersPlaylistsResponse *models.SpotifyCurrentUsersPlaylistsResponse

	if err := REQUEST_MANAGER.GetInto("/me/playlists", &spotifyCurrentUsersPlaylistsResponse, token); err != nil {
		utils.LogError("GetCurrentUsersPlaylists", err.Error())
		return nil, &models.SpotifyErrorResponse{
			Error: models.SpotifyErrorObjectResponse{
				Status: http.StatusInternalServerError,
				Message: err.Error(),
			},
		}
	}

	return spotifyCurrentUsersPlaylistsResponse, nil

}

/* Combine Playlists
*	1. Get the track ids from the selected playlists
*	2. Create the playlist with the name and description
*	3. Add tracks to the newly created playlist  
*/

// Get the track ids from the selected playlists
func GetPlaylistTracks(playlist_id string, token string) (*models.SpotifyPlaylistItemsResponse, *models.SpotifyErrorResponse) {
	
	var spotifyPlaylistItemsResponse *models.SpotifyPlaylistItemsResponse

	parameters := url.Values{
		"fields": {TRACK_FIELDS},
	}

	api_endpoint := "/playlists/" + playlist_id + "/tracks?" + string(parameters.Encode())

	if err := REQUEST_MANAGER.GetInto(api_endpoint, &spotifyPlaylistItemsResponse, token); err != nil {
		utils.LogError("GetPlaylistTracks", err.Error())
		return nil, &models.SpotifyErrorResponse{
			Error: models.SpotifyErrorObjectResponse{
				Status: http.StatusInternalServerError,
				Message: err.Error(),
			},
		}
	}
	
	return spotifyPlaylistItemsResponse, nil
}

// Create the playlist with the name and description
func CreatePlaylist(user_id string, playlist_name string, playlist_description string, token string) (*models.SpotifyCreatePlaylistResponse, *models.SpotifyErrorResponse) {
	
	spotifyCreatePlaylistRequest := &models.SpotifyCreatePlaylistRequest{
		Name: playlist_name,
		Description: playlist_description,
	}

	var spotifyCreatePlaylistResponse *models.SpotifyCreatePlaylistResponse

	if err := REQUEST_MANAGER.PostInto("/users/" + user_id + "/playlists", &spotifyCreatePlaylistRequest, &spotifyCreatePlaylistResponse, token); err != nil {
		utils.LogError("CreatePlaylist", err.Error())
		return nil, &models.SpotifyErrorResponse{
			Error: models.SpotifyErrorObjectResponse{
				Status: http.StatusInternalServerError,
				Message: err.Error(),
			},
		}
	}

	return spotifyCreatePlaylistResponse, nil
}

// Add tracks to the newly created playlist
func AddTracksToPlaylist(playlist_id string, track_ids []string, token string) (*models.SpotifyAddItemsToPlaylistResponse, *models.SpotifyErrorResponse) {
	
	spotifyAddTracksToPlaylistRequest := &models.SpotifyAddItemsToPlaylistRequest{
		URIs: track_ids,
		Position: 0,
	}

	var spotifyAddTracksToPlaylistResponse *models.SpotifyAddItemsToPlaylistResponse

	if err := REQUEST_MANAGER.PostInto("/playlists/" + playlist_id + "/tracks", &spotifyAddTracksToPlaylistRequest, &spotifyAddTracksToPlaylistResponse, token); err != nil {
		utils.LogError("AddTracksToPlaylist", err.Error())
		return nil, &models.SpotifyErrorResponse{
			Error: models.SpotifyErrorObjectResponse{
				Status: http.StatusInternalServerError,
				Message: err.Error(),
			},
		}
	}
	
	return spotifyAddTracksToPlaylistResponse, nil
}