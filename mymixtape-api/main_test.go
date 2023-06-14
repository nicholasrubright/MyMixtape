package main

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"

	server "github.com/mymixtape-api/server"
)

func SetUpRouter() *gin.Engine{
	router := gin.Default()
	return router
}

func TestGetAuthorizationUrl(t *testing.T) {
	//mockResponse := &models.ClientAuthorizationUrlResponse{Url: "testing",}

	r := SetUpRouter()
	r.GET("/api/auth", server.GetAuthorizationUrl)

	req, _ := http.NewRequest("GET", "/api/auth", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	//responseData, _ := ioutil.ReadAll(w.Body)

	//assert.Equal(t, mockResponse, string(responseData))
	assert.Equal(t, http.StatusOK, w.Code)
}