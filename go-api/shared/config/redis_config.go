package config

import (
	"fmt"
	"log"
	"os"
)

const (
	redisPort = "6379"
)

type RedisConfig struct {
	Password  string
	ReadHost  string
	WriteHost string
}

func (r RedisConfig) ReadAddress() string {
	return fmt.Sprintf("%v:%v", r.ReadHost, redisPort)
}

func (r RedisConfig) WriteAddress() string {
	return fmt.Sprintf("%v:%v", r.WriteHost, redisPort)
}

func NewRedisConfigFromEnv() (r RedisConfig) {
	var ok bool
	r.Password, ok = os.LookupEnv("REDIS_PASSWORD")
	if !ok {
		log.Fatal("REDIS_PASSWORD is not set")
	}
	r.ReadHost, ok = os.LookupEnv("REDIS_HOST_READ")
	if !ok {
		log.Fatal("REDIS_HOST_READ is not set")
	}
	r.WriteHost, ok = os.LookupEnv("REDIS_HOST_WRITE")
	if !ok {
		log.Fatal("REDIS_HOST_WRITE is not set")
	}
	return
}
