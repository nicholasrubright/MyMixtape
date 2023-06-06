package main

import (
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/mymixtape-api/server"
)

func main() {

	InitConfig()

	server.SPOTIFY_CLIENT_ID = SPOTIFY_CLIENT_ID
	server.SPOTIFY_CLIENT_SECRET = SPOTIFY_CLIENT_SECRET
	server.SPOTIFY_CLIENT_REDIRECT = SPOTIFY_CLIENT_REDIRECT

	router := gin.Default()
	
	// Sessions
	store := cookie.NewStore([]byte(SESSION_SECRET))
	store.Options(sessions.Options{MaxAge: 60 * 60 * 24})
	router.Use(sessions.Sessions("mysession", store))

	// Authorization
	router.GET("/api/auth", server.GetAuthorizationUrl)
	router.POST("/api/auth", server.GetAccessToken)

	// User
	router.GET("/api/user", server.GetCurrentUsersProfile)

	// Playlists
	router.GET("/api/playlists", server.GetCurrentUsersPlaylists)

	router.Run("localhost:8080")
}