package utils

import "fmt"

const (
	api_scheme = "https"
	api_host = "api.spotify.com"
	api_version = "v1"

	TOKEN_URL = "https://accounts.spotify.com/api/token"
)

// Creates the base API url
func GetSpotifyApiUrl(endpoint string) string {
	return fmt.Sprintf("%v://%v/%v/%v", api_scheme, api_host, api_version, endpoint)
}