package models

type ClientAccessTokenRequest struct {
	Code	string	`json:"code"`
}

type ClientCombinePlaylistRequest struct {
	UserID		string		`form:"userId"`
	Name		string		`form:"name"`
	Description	string		`form:"description"`
	PlaylistIDs	string		`form:"playlistIds"`
}

type ClientGetCurrentUsersPlaylistsRequestQueryParameters struct {
	Limit	string	`form:"limit"`
	Offset	string	`form:"offset"`
}