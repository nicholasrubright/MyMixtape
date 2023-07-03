package models

type AccessTokenRequest struct {
	Code	string	`json:"code"`
}

type CombinePlaylistRequest struct {
	UserID		string		`form:"userId"`
	Name		string		`form:"name"`
	Description	string		`form:"description"`
	PlaylistIDs	[]string	`form:"playlistIds"`
}

type GetCurrentUsersPlaylistsRequestQueryParameters struct {
	Limit	string	`form:"limit"`
	Offset	string	`form:"offset"`
}