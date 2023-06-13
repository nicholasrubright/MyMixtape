package models

import (
	"github.com/mymixtape-api/spotify/models"
)

type PlaylistTracks struct {
	Tracks	[]struct {
		ID string	`json:"id"`
	}
}

func NewPlaylistTracks(spotifyPlaylistItemsResponse *models.SpotifyPlaylistItemsResponse) *PlaylistTracks {

	var tracks []struct {
		ID	string	`json:"id"`
	}

	tracks = make([]struct{ID string `json:"id"`}, 0)

	for _, spotifyPlaylistItem := range spotifyPlaylistItemsResponse.Items {
		tracks = append(tracks, struct{ID string `json:"id"`}{
			spotifyPlaylistItem.Track.ID,
		})
	}

	return &PlaylistTracks{
		Tracks: tracks,
	}

}