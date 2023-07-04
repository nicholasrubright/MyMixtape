package router

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"

	"github.com/mymixtape-api/config"
	"github.com/mymixtape-api/controllers"
)

var (
	CORS_ALLOW_ORIGINS = []string{}
	CORS_ALLOW_METHODS = []string{"GET", "POST", "OPTIONS"}
	CORS_ALLOW_HEADERS = []string{"Origin", "Authorization"}
	CORS_EXPOSE_HEADERS = []string{"Content-Length"}
	CORS_MAX_AGE = 12 * time.Hour
)

func InitRoutes() *gin.Engine {

	config.InitConfig()

	router := gin.Default()

	// Session
	store := cookie.NewStore([]byte("secret"))
	router.Use(sessions.Sessions("mysession", store))

	CORS_ALLOW_ORIGINS = []string{config.APP_CLIENT_ADDRESS, config.APP_SERVER_ADDRESS}

	if config.API_ENVIRONMENT == "PROD" {
		gin.SetMode(gin.ReleaseMode)
	}

	if config.API_ENVIRONMENT == "DEV" {
		// CORS Policy for testing at app level
		corsPolicy := cors.New(cors.Config{
			AllowOrigins: CORS_ALLOW_ORIGINS,
			AllowMethods: CORS_ALLOW_METHODS,
			AllowHeaders: CORS_ALLOW_HEADERS,
			ExposeHeaders: CORS_EXPOSE_HEADERS,
			AllowCredentials: true,
			MaxAge: CORS_MAX_AGE,
		})

		router.Use(corsPolicy)

		router.SetTrustedProxies([]string{})
	}

	apiRoutes := router.Group("/api")
	{
		apiRoutes.GET("/auth", controllers.GetAuthorizationUrl)
		apiRoutes.POST("/auth", controllers.GetAccessToken)
		apiRoutes.OPTIONS("/auth", func(c *gin.Context) {
			c.Done()
		})

		apiRoutes.GET("/user", controllers.GetCurrentUsersProfile)
		apiRoutes.OPTIONS("/user", func(c *gin.Context) {
			c.Done()
		})

		apiRoutes.GET("/playlists", controllers.GetCurrentUsersPlaylists)
		apiRoutes.POST("/playlists", controllers.CombinePlaylists)
		apiRoutes.OPTIONS("/playlists", func(c *gin.Context) {
			c.Done()
		})

		apiRoutes.GET("/test", controllers.TestProfile)
	}

	return router
}
