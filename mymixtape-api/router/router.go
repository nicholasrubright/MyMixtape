package router

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/securecookie"
	"github.com/mymixtape-api/config"
	"github.com/mymixtape-api/middleware"
)

var (
	CORS_ALLOW_ORIGINS  = []string{}
	CORS_ALLOW_METHODS  = []string{"GET", "POST", "OPTIONS"}
	CORS_ALLOW_HEADERS  = []string{"Origin", "Authorization"}
	CORS_EXPOSE_HEADERS = []string{"Content-Length"}
	CORS_MAX_AGE        = 12 * time.Hour
)


func InitRoutes() *gin.Engine {

	config.InitConfig()

	gin.ForceConsoleColor()

	router := gin.Default()	

	// Session
	session_secret := securecookie.GenerateRandomKey(64)
	if session_secret == nil {
		panic("Failed to initialize session")
	}

	store := cookie.NewStore(session_secret)
	store.Options(sessions.Options{
		MaxAge: 60 * 60 * 24,
		Path: "/",
	})
	router.Use(sessions.Sessions(config.SESSION_VAR, store))

	CORS_ALLOW_ORIGINS = []string{config.APP_CLIENT_ADDRESS, config.APP_SERVER_ADDRESS}

	if config.API_ENVIRONMENT == "PROD" {
		gin.SetMode(gin.ReleaseMode)
	}

	if config.API_ENVIRONMENT == "DEV" {
		// CORS Policy for testing at app level
		corsPolicy := cors.New(cors.Config{
			AllowOrigins:     CORS_ALLOW_ORIGINS,
			AllowMethods:     CORS_ALLOW_METHODS,
			AllowHeaders:     CORS_ALLOW_HEADERS,
			ExposeHeaders:    CORS_EXPOSE_HEADERS,
			AllowCredentials: true,
			MaxAge:           CORS_MAX_AGE,
		})

		router.Use(corsPolicy)

		router.SetTrustedProxies([]string{})
	}

	s := NewServices()

	apiRoutes := router.Group("/api")

	apiRoutes.GET("/auth", s.GetAuthorizationUrl)
	apiRoutes.POST("/auth", s.GetAccessToken)
	apiRoutes.OPTIONS("/auth", func(c *gin.Context) {
		c.Done()
	})

	apiRoutes.GET("/user", middleware.SessionMiddleware(), s.GetCurrentUsersProfile)
	apiRoutes.OPTIONS("/user", func(c *gin.Context) {
		c.Done()
	})

	apiRoutes.GET("/playlists", middleware.SessionMiddleware(), s.GetCurrentUsersPlaylists)
	apiRoutes.POST("/playlists", middleware.SessionMiddleware(), s.CombinePlaylists)
	apiRoutes.OPTIONS("/playlists", func (c *gin.Context) {
		c.Done()
	})

	return router
}
