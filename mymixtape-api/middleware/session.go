package middleware

import (
	"net/http"
	"time"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/mymixtape-api/config"
	"github.com/mymixtape-api/internal"
	"github.com/mymixtape-api/models"
)

func GetTokenFromSession(session sessions.Session) (*internal.SessionToken, *internal.SessionError)  {

	var token string
	var expires_in time.Time
	var code string

	tokenVal := session.Get("token")
	if tokenVal == nil {
		return nil, &internal.SessionError{
			Message: "No token in session",
		}
	} else {
		token = tokenVal.(string)
	}
	
	expiresVal := session.Get("expires")
	if expiresVal == nil {
		return nil, &internal.SessionError{
			Message: "No expires_in in session",
		}
	} else {
		expiresStr := expiresVal.(string)

		expires_in, _ = time.Parse("2006-01-02 15:04:05", expiresStr)
	}

	codeVal := session.Get("code")
	if codeVal == nil {
		return nil, &internal.SessionError{
			Message: "No code in session",
		}
	} else {
		codeVal = codeVal.(string)
	}

	return &internal.SessionToken{
		Token: token,
		Expires: expires_in,
		Code: code,
	}, nil

}

func SetTokenInSession(session sessions.Session, token string, expires string, code string) {

	session.Set("token", token)
	session.Set("expires", expires)
	session.Set("code", code)
	session.Save()

} 

func SessionMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		_, err := c.Cookie(config.SESSION_VAR)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, &models.ErrorResponse{
				Message: "Cookie missing",
				Status: http.StatusBadRequest,
			})
			return
		}

		session := sessions.Default(c)
		sessionToken, sessionError := GetTokenFromSession(session)

		if sessionError != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, &models.ErrorResponse{
				Message: sessionError.Message,
				Status: http.StatusUnauthorized,
			})
			return
		}

		c.Set("token", sessionToken.Token)

		c.Next()
	}
}