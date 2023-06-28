package main

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/mymixtape-api/server"
)

var (
	ROUTER *gin.Engine
)

var (
	CORS_ALLOW_ORIGINS = []string{}
	CORS_ALLOW_METHODS = []string{"GET", "POST", "OPTIONS"}
	CORS_ALLOW_HEADERS = []string{"Origin", "Authorization"}
	CORS_EXPOSE_HEADERS = []string{"Content-Length"}
	CORS_MAX_AGE = 12 * time.Hour
)

func CreateRoutes() {

	apiRoutes := ROUTER.Group("/api")
	{
		apiRoutes.GET("/auth", server.GetAuthorizationUrl)
		apiRoutes.POST("/auth", server.GetAccessToken)
		apiRoutes.OPTIONS("/auth", func(c *gin.Context) {
			c.Done()
		})

		apiRoutes.GET("/user", server.GetCurrentUsersProfile)
		apiRoutes.OPTIONS("/user", func(c *gin.Context) {
			c.Done()
		})

		apiRoutes.GET("/playlists", server.GetCurrentUsersPlaylists)
		apiRoutes.POST("/playlists", server.CombinePlaylists)
		apiRoutes.OPTIONS("/playlists", func(c *gin.Context) {
			c.Done()
		})
	}

}

func SetupRouter() {

	CORS_ALLOW_ORIGINS = []string{"http://172.23.0.3:3000", "http://localhost:3000"}

	if API_ENVIRONMENT == "PROD" {
		gin.SetMode(gin.ReleaseMode)
	}

	ROUTER = gin.Default()

	if API_ENVIRONMENT == "DEV" {
		// CORS Policy for testing at app level
		corsPolicy := cors.New(cors.Config{
			AllowOrigins: CORS_ALLOW_ORIGINS,
			AllowMethods: CORS_ALLOW_METHODS,
			AllowHeaders: CORS_ALLOW_HEADERS,
			ExposeHeaders: CORS_EXPOSE_HEADERS,
			AllowCredentials: true,
			MaxAge: CORS_MAX_AGE,
		})

		ROUTER.Use(corsPolicy)

		ROUTER.SetTrustedProxies([]string{})
	}


	// Set up Routes
	CreateRoutes()
}

func StartRouter() {

	if PORT == "" {
		PORT = "8080"
	}

	ROUTER.Run(":" + PORT)
}
