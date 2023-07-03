package main

import "github.com/mymixtape-api/router"

func main() {
	engine := router.InitRoutes()
	engine.Run()
}