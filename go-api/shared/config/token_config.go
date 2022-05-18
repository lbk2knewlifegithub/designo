package config

import (
	"log"
	"os"
	"time"
)

const minSecretKeySize = 32

type TokenConfig struct {
	// Token Config
	Secret      string
	SecretBytes []byte

	AccessTokenDuration time.Duration

	RefreshTokenDuration time.Duration
}

func NewTokenConfigFromEnv() TokenConfig {
	// Get Token Secret
	secret, ok := os.LookupEnv("TOKEN_SECRET")
	if !ok {
		log.Fatal("TOKEN_SECRET is not set")
	}
	// Check Token Secret Size
	if len(secret) < minSecretKeySize {
		log.Fatalf("invalid key size: must be at least %d characters", minSecretKeySize)
	}

	// Get Access Token Duration
	accessTokenDurationRaw, ok := os.LookupEnv("ACCESS_TOKEN_DURATION")
	if !ok {
		log.Fatal("ACCESS_TOKEN_DURATION is not set")
	}
	accessTokenDuration, err := time.ParseDuration(accessTokenDurationRaw)
	if err != nil {
		log.Fatal("ACCESS_TOKEN_DURATION invalid:", err)
	}

	// Get Refresh Token Duration
	refreshTokenDurationRaw, ok := os.LookupEnv("REFRESH_TOKEN_DURATION")
	if !ok {
		log.Fatal("REFRESH_TOKEN_DURATION is not set")
	}
	refreshTokenDuration, err := time.ParseDuration(refreshTokenDurationRaw)
	if err != nil {
		log.Fatal("REFRESH_TOKEN_DURATION invalid:", err)
	}

	return TokenConfig{
		Secret:               secret,
		SecretBytes:          []byte(secret),
		AccessTokenDuration:  accessTokenDuration,
		RefreshTokenDuration: refreshTokenDuration,
	}
}
