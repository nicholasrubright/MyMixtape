package utils

import (
	b64 "encoding/base64"
	"fmt"
)

func GetEncodedClientCredentials(client_id string, client_secret string) string {
	str := fmt.Sprintf("%v:%v", client_id, client_secret)
	encodedStr := b64.StdEncoding.EncodeToString([]byte(str))
	return encodedStr
}

func GetSpotifyTrackURI(track_id string) string {
	return "spotify:track:" + track_id
}