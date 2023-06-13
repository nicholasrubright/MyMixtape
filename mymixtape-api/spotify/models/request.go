package models

// Playlists
type SpotifyAddItemsToPlaylistRequest struct {
	URIs		[]string	`json:"uris"`
	Position	int			`json:"position"`
}

type SpotifyCreatePlaylistRequest struct {
	Name			string	`json:"name"`
	Public			bool	`json:"public"`
	Collaborative	bool	`json:"collaborative"`
	Description		string	`json:"description"`
}