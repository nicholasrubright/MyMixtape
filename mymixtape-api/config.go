package main

import (
	"os"

	"github.com/joho/godotenv"

	"github.com/mymixtape-api/server"
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
)

func SetServerConfig() {
	// Set up Config
	server.SPOTIFY_CLIENT_ID = SPOTIFY_CLIENT_ID
	server.SPOTIFY_CLIENT_SECRET = SPOTIFY_CLIENT_SECRET
	server.SPOTIFY_CLIENT_REDIRECT = SPOTIFY_CLIENT_REDIRECT
}

func InitConfig() {
	godotenv.Load(".env")

	SPOTIFY_CLIENT_ID = os.Getenv("SPOTIFY_CLIENT_ID")
	SPOTIFY_CLIENT_SECRET = os.Getenv("SPOTIFY_CLIENT_SECRET")
	SPOTIFY_CLIENT_REDIRECT = os.Getenv("SPOTIFY_CLIENT_REDIRECT")

	APP_CLIENT_ADDRESS = os.Getenv("APP_CLIENT_ADDRESS")
	APP_SERVER_ADDRESS = os.Getenv("APP_SERVER_ADDRESS")
	PORT = os.Getenv("PORT")

	API_ENVIRONMENT = os.Getenv("API_ENVIRONMENT")

	SetServerConfig()
}