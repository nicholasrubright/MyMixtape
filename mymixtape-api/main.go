package main

import (
	"github.com/gin-gonic/gin"
	"github.com/mymixtape-api/server"
)

func main() {

	InitConfig()

	server.SPOTIFY_CLIENT_ID = SPOTIFY_CLIENT_ID
	server.SPOTIFY_CLIENT_SECRET = SPOTIFY_CLIENT_SECRET
	server.SPOTIFY_CLIENT_REDIRECT = SPOTIFY_CLIENT_REDIRECT




	router := gin.Default()
	
	router.GET("/api/auth", server.GetAuthorizationUrl)
	// router.POST("/api/auth", )

	router.Run("localhost:8080")
}