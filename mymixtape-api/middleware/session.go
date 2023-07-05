package middleware

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/mymixtape-api/internal"
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

	session.Set("token", token)
	session.Set("expires_in", expires_in)
	session.Save()

} 

func SessionMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)

		sessionToken, sessionError := GetTokenFromSession(session)

		if sessionError != nil {
			c.AbortWithStatusJSON(401, gin.H{"error": "Token Required"})
		}

		c.Set("token", sessionToken)

		c.Next()
	}
}