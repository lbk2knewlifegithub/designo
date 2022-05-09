package services

import (
	"context"
	"fmt"
	"log"
	"os"

	"shared/utils"

	redisLib "github.com/go-redis/redis/v8"
)

type redis struct {
	Read  *redisLib.Client
	Write *redisLib.Client
}

var Redis redis

func init() {
	utils.LoadEnv()

	// Get Redis Password
	redisPassword := os.Getenv("REDIS_PASSWORD")
	if redisPassword == "" {
		panic("REDIS_PASSWORD is not set")
	}
	// Get Redis Read Host
	readHost := os.Getenv("REDIS_HOST_READ")
	if readHost == "" {
		panic("REDIS_HOST_READ is not set")
	}
	// Get Redis Write Host
	writeHost := os.Getenv("REDIS_HOST_WRITE")
	if writeHost == "" {
		panic("REDIS_HOST_WRITE is not set")
	}

	read := redisLib.NewClient(&redisLib.Options{
		Addr:     fmt.Sprintf("%v:6379", readHost),
		Password: redisPassword,
		Username: "default",
		DB:       0,
	})

	// Ping the server to check if it's alive
	if _, err := read.Ping(context.Background()).Result(); err != nil {
		panic("Redis Read is not running")
	}
	log.Println("Connected to redis read")

	write := redisLib.NewClient(&redisLib.Options{
		Addr:     fmt.Sprintf("%v:6379", writeHost),
		Password: redisPassword,
		Username: "default",
		DB:       0,
	})

	// Check Redis Write Server
	if _, err := write.Ping(context.Background()).Result(); err != nil {
		panic("Redis Write is not running")
	}
	log.Println("Connected to redis Write")

	Redis = redis{
		Read:  read,
		Write: write,
	}
}
