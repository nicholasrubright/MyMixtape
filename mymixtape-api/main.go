package main

import (
	"github.com/gin-gonic/gin"
	server "github.com/mymixtape-api/server"
)

func main() {

	InitConfig()

	router := gin.Default()
	
	router.GET("/api/auth", server.GetAuthorizationUrl)

	router.Run("localhost:8080")
}