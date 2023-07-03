package utils

import "github.com/mymixtape-api/models"

type PlaylistTracks struct {
	Tracks []struct {
		ID string `json:"id"`
	}
}

func NewPlaylistTracks(playlistItemsResponse *models.SpotifyPlaylistItemsResponse) *PlaylistTracks {
	var tracks []struct {
		ID	string	`json:"id"`
	}

	tracks = make([]struct { ID string `json:"id"`}, 0)

	for _, playlistItem := range playlistItemsResponse.Items {
		tracks = append(tracks, struct{ID string "json:\"id\""}{
			playlistItem.Track.ID,
		})
	}

	return &PlaylistTracks{
		Tracks: tracks,
	}
}