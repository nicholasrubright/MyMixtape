package utils

import (
	"fmt"
	"math/rand"
	"net/url"
)

const (
	STATE_LENGTH = 16
)

var (
	CHARACTERS = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
)

// Generate State for Spotify Api
func GenerateAuthorizationState() string {
	text := make([]rune, STATE_LENGTH)
	for i := range text {
		text[i] = CHARACTERS[rand.Intn(len(CHARACTERS))]
	}

	return string(text)
}

func GenerateAuthorizationUrl(authorization_url string, parameters url.Values) string {
	return fmt.Sprintf("%v?%v", authorization_url, parameters.Encode())
}