package services

import "github.com/mymixtape-api/models"

type IMixer interface {
	CombinePlaylists(user string, name string, description string, ids []string, token string) *models.ErrorResponse
}

type Mixer struct {
	Spotify ISpotify
}

func NewMixer(spotify ISpotify) Mixer {
	return Mixer{
		Spotify: spotify,
	}
}

func (m Mixer) CombinePlaylists(user string, name, description string, ids []string, token string) *models.ErrorResponse {
	return nil
}

