package models

type ClientAccessTokenRequest struct {
	Code	string	`json:"code"`
}

type ClientCombinePlaylistRequest struct {
	UserID		string		`json:"user_id"`
	Name		string		`json:"name"`
	Description	string		`json:"description"`
	PlaylistIDs	[]string	`json:"playlist_ids"`
}

type ClientGetCurrentUsersPlaylistsRequestQueryParameters struct {
	Limit	string	`form:"limit"`
	Offset	string	`form:"offset"`
}