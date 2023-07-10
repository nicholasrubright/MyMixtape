package internal

import "time"

type PlaylistTracks struct {
	Tracks []struct {
		ID string `json:"id"`
	}
}

// Session
type SessionToken struct {
	Token   string
	Expires time.Time
	Code    string
}

type SessionError struct {
	Message string
}