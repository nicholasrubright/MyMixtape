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
