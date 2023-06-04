package models

type ClientAuthorizationUrlResponse struct {
	Url		string	`json:"url"`
}


// Error Response
type ClientErrorResponse struct {
	Message	string	`json:"message"`
	Status	int		`json:"status"`
}