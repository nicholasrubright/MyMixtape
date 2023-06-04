package models

// Authorization
type SpotifyAccessTokenResponse struct {
	AccessToken		string	`json:"access_token"`
	TokenType		string	`json:"token_type"`
	ExpiresIn		int		`json:"expires_in"`
}

type SpotifyAuthorizationUrlResponse struct {
	Url	string	`json:"url"`
}

// User Profile
type SpotifyCurrentUsersProfileResponse struct {
	Country         string `json:"country"`
	DisplayName     string `json:"display_name"`
	Email           string `json:"email"`
	ExplicitContent struct {
		FilterEnabled bool `json:"filter_enabled"`
		FilterLocked  bool `json:"filter_locked"`
	} `json:"explicit_content"`
	ExternalUrls struct {
		Spotify string `json:"spotify"`
	} `json:"external_urls"`
	Followers struct {
		Href  string `json:"href"`
		Total int    `json:"total"`
	} `json:"followers"`
	Href   string `json:"href"`
	ID     string `json:"id"`
	Images []struct {
		URL    string `json:"url"`
		Height int    `json:"height"`
		Width  int    `json:"width"`
	} `json:"images"`
	Product string `json:"product"`
	Type    string `json:"type"`
	URI     string `json:"uri"`
}


// Error Responses
type SpotifyAuthenticationErrorResponse struct {
	Error	string	`json:"error"`
	Description string	`json:"error_description"`
}

type SpotifyErrorResponse struct {
	Error	SpotifyErrorObjectResponse	`json:"error"`
}

type SpotifyErrorObjectResponse struct {
	Status	int		`json:"status"`
	Message	string	`json:"message"`
}
