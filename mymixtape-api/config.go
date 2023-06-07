package main

import (
	"os"

	"github.com/joho/godotenv"
)

var (
	SPOTIFY_CLIENT_ID = ""
	SPOTIFY_CLIENT_SECRET = ""
	SPOTIFY_CLIENT_REDIRECT = ""

	CLIENT_ADDRESS = ""
	API_ADDRESS = ""
	SESSION_SECRET = ""
)

func InitConfig() {
	godotenv.Load(".env")

	SPOTIFY_CLIENT_ID = os.Getenv("SPOTIFY_CLIENT_ID")
	SPOTIFY_CLIENT_SECRET = os.Getenv("SPOTIFY_CLIENT_SECRET")
	SPOTIFY_CLIENT_REDIRECT = os.Getenv("SPOTIFY_CLIENT_REDIRECT")

	CLIENT_ADDRESS = os.Getenv("CLIENT_ADDRESS")
	API_ADDRESS = os.Getenv("API_ADDRESS")
	SESSION_SECRET = os.Getenv("SESSION_SECRET")
}