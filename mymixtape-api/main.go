package main

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/mymixtape-api/server"
)

func main() {

	InitConfig()

	server.SPOTIFY_CLIENT_ID = SPOTIFY_CLIENT_ID
	server.SPOTIFY_CLIENT_SECRET = SPOTIFY_CLIENT_SECRET
	server.SPOTIFY_CLIENT_REDIRECT = SPOTIFY_CLIENT_REDIRECT

	router := gin.Default()
	
	// CORS Policy For Testing
	router.Use(cors.New(cors.Config{
        AllowOrigins:     []string{CLIENT_ADDRESS},
        AllowMethods:     []string{"GET,POST,OPTIONS"},
        AllowHeaders:     []string{"Origin,X-MyMixtape-Token"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
        MaxAge: 12 * time.Hour,
    }))

	// Authorization
	router.GET("/api/auth", server.GetAuthorizationUrl)
	router.POST("/api/auth", server.GetAccessToken)

	// User
	router.GET("/api/user", server.GetCurrentUsersProfile)

	// Playlists
	router.GET("/api/playlists", server.GetCurrentUsersPlaylists)
	router.POST("/api/playlists", server.CombinePlaylists)

	router.Run(API_ADDRESS)
}