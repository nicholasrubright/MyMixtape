package middleware

import (
	"fmt"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/mymixtape-api/internal"
	"github.com/mymixtape-api/models"
)

func GetTokenFromSession(session sessions.Session) (*internal.SessionToken, *internal.SessionError)  {

	var token string
	var expires_in int

	tokenVal := session.Get("token")
	if tokenVal == nil {
		return nil, &internal.SessionError{
			Message: "No token in session",
		}
	} else {
		token = tokenVal.(string)
	}

	expiresVal := session.Get("expires_in")
	if expiresVal == nil {
		return nil, &internal.SessionError{
			Message: "No expires_in in session",
		}
	} else {
		expires_in = expiresVal.(int)
	}

	return &internal.SessionToken{
		Token: token,
		ExpiresIn: expires_in,
	}, nil

}

func SetTokenInSession(session sessions.Session, token string, expires_in int) {

	fmt.Println("set token in session: ", token, expires_in)

	session.Set("token", token)
	session.Set("expires_in", expires_in)
	session.Save()

} 

func SessionMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		cookie, err := c.Cookie("mysession")
		if err != nil {
			fmt.Println("NO MYSESSION COOKIE")
		}

		fmt.Println("session middleware cookie: ", cookie)

		session := sessions.Default(c)

		fmt.Println("GETTING TOKEN FROM SESSION!")

		sessionToken, sessionError := GetTokenFromSession(session)

		fmt.Println("TOKENS FROM SESSION: ", sessionToken)

		errorResponse := &models.ErrorResponse {
			Message: "Valid token required",
			Status: http.StatusUnauthorized,
		}

		if sessionError != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, errorResponse)
		}

		c.Set("token", sessionToken)

		c.Next()
	}
}