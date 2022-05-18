package cache

import (
	"context"
	redisLib "github.com/go-redis/redis/v8"
	"log"
	"shared/config"
	"time"
)

type RedisService struct {
	read  *redisLib.Client
	write *redisLib.Client
}

func NewRedis(redisConfig config.RedisConfig) Cache {
	read := redisLib.NewClient(&redisLib.Options{
		Addr:     redisConfig.ReadAddress(),
		Password: redisConfig.Password,
		Username: "default",
		DB:       0,
	})

	// Ping the server to check if it's alive
	if _, err := read.Ping(context.Background()).Result(); err != nil {
		log.Fatal("Redis Read is not running on address: ", redisConfig.ReadAddress())
	}

	write := redisLib.NewClient(&redisLib.Options{
		Addr:     redisConfig.WriteAddress(),
		Password: redisConfig.Password,
		Username: "default",
		DB:       0,
	})

	// Check Redis Set Server
	if _, err := write.Ping(context.Background()).Result(); err != nil {
		log.Fatal("Redis Set is not running on address: ", redisConfig.ReadAddress())
	}

	log.Println("Connected to redis Set")

	return &RedisService{
		read:  read,
		write: write,
	}
}

func (r *RedisService) Set(key *string, value *string, expiration time.Duration) error {
	result := r.write.Set(context.Background(), *key, *value, expiration)
	return result.Err()
}

func (r *RedisService) Read(key *string) (*string, error) {
	result, err := r.read.Get(context.Background(), *key).Result()
	if err != nil {
		return nil, err
	}
	return &result, nil
}
