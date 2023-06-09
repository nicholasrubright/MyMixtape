package models

// Authorization
type ClientAuthorizationUrlResponse struct {
	Url		string	`json:"url"`
	ValidToken	bool	`json:"valid_token"`
}

type ClientAccessTokenResponse struct {
	Token	string	`json:"token"`
	ExpiresIn	int	`json:"expires_in"`
}

// User Profile
type ClientCurrentUsersProfileResponse struct {
	ID		string	`json:"id"`
	Name	string	`json:"name"`
	Images []struct {
		URL    string `json:"url"`
		Height int    `json:"height"`
		Width  int    `json:"width"`
	} `json:"images"`
}


// User Playlists
type ClientCurrentUsersPlaylistsResponse struct {
	Href	string	`json:"href"`
	Limit	int		`json:"limit"`
	Next	string	`json:"next"`
	Offset	int		`json:"offset"`
	Previous	string	`json:"previous"`
	Total	int		`json:"total"`
	Items    []struct {
		ID     string `json:"id"`
		Images []struct {
			URL    string `json:"url"`
			Height int    `json:"height"`
			Width  int    `json:"width"`
		} `json:"images"`
		Name  string `json:"name"`
	} `json:"items"`
}

type ClientPlaylistItemsResponse struct {
	Items    []struct {
		Track   struct {
			ID         string `json:"id"`
			Name        string `json:"name"`
			Type        string `json:"type"`
		} `json:"track"`
	} `json:"items"`
}

type ClientCombinePlaylistResponse struct {
	ID	string	`json:"id"`
	Name	string	`json:"name"`
}

// Error Response
type ClientErrorResponse struct {
	Message	string	`json:"message"`
	Status	int		`json:"status"`
}