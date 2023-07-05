package internal

type PlaylistTracks struct {
	Tracks []struct {
		ID string `json:"id"`
	}
}

// Session
type SessionToken struct {
	Token		string
	ExpiresIn	int
}

type SessionError struct {
	Message	string
}