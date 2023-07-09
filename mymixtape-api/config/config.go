package config

import (
	"os"

	"github.com/joho/godotenv"
)

var (
	// Spotify Variables
	SPOTIFY_CLIENT_ID = ""
	SPOTIFY_CLIENT_SECRET = ""
	SPOTIFY_CLIENT_REDIRECT = ""

	// Application Variables
	APP_CLIENT_ADDRESS = ""
	APP_SERVER_ADDRESS = ""
	PORT = ""

	// Environment
	API_ENVIRONMENT = ""

	// Session Variables
	SESSION_VAR = ""
	SESSION_SECRET = ""
)

func InitConfig() {
	godotenv.Load(".env")

	SPOTIFY_CLIENT_ID = os.Getenv("SPOTIFY_CLIENT_ID")
	SPOTIFY_CLIENT_SECRET = os.Getenv("SPOTIFY_CLIENT_SECRET")
	SPOTIFY_CLIENT_REDIRECT = os.Getenv("SPOTIFY_CLIENT_REDIRECT")

	APP_CLIENT_ADDRESS = os.Getenv("APP_CLIENT_ADDRESS")
	APP_SERVER_ADDRESS = os.Getenv("APP_SERVER_ADDRESS")
	PORT = os.Getenv("PORT")

	API_ENVIRONMENT = os.Getenv("API_ENVIRONMENT")

	SESSION_VAR = os.Getenv("SESSION_VAR")
	SESSION_SECRET = os.Getenv("SESSION_SECRET")
}