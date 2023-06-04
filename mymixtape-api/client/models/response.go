package models

// Authorization
type ClientAuthorizationUrlResponse struct {
	Url		string	`json:"url"`
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


// Error Response
type ClientErrorResponse struct {
	Message	string	`json:"message"`
	Status	int		`json:"status"`
}