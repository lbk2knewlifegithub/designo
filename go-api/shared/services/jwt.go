package services

import (
	"strconv"
	"time"

	"os"
	"shared/models"
	"shared/utils"

	jwtLib "github.com/golang-jwt/jwt"
)

type jwt struct {
	secret string
	expire int64
}

var JWT jwt

// Init JWT
func init() {
	utils.LoadEnv()

	// Get secret from env.
	secret := string(os.Getenv("JWT_SECRET"))

	if secret == "" {
		panic("JWT_SECRET is not set")
	}

	// Get expire time from env.
	expire, err := strconv.ParseInt(os.Getenv("JWT_EXPIRE"), 10, 64)
	if err != nil {
		panic("JWT_EXPIRE must be number")
	}

	JWT = jwt{
		secret,
		expire,
	}
}

// CreateAccessToken func for generate a new Access token.
func (jwt jwt) Hash(id *string, admin bool) (*string, error) {

	// Create a new claims.
	claims := jwtLib.MapClaims{
		"id":    *id,
		"exp":   time.Now().Add(time.Minute * time.Duration(jwt.expire)).Unix(),
		"admin": admin,
	}

	// Create a new JWT access token with claims.
	token := jwtLib.NewWithClaims(jwtLib.SigningMethodHS256, claims)

	// Generate token.
	t, err := token.SignedString([]byte(jwt.secret))
	if err != nil {
		// Return error, it JWT token generation failed.
		return nil, err
	}

	return &t, nil
}

// Decode Token
func (jwt jwt) Decode(tokenString *string) (*models.UserToken, error) {
	token, err := jwtLib.Parse(*tokenString, func(token *jwtLib.Token) (interface{}, error) {
		return []byte(jwt.secret), nil
	})

	if err != nil {
		return nil, err
	}

	lemon := token.Claims.(jwtLib.MapClaims)
	userToken := models.UserToken{
		Id:    lemon["id"].(string),
		Admin: lemon["admin"].(bool),
	}

	return &userToken, nil
}
