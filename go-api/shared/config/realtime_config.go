package config

import (
	"log"
	"os"
)

type RealtimeConfig struct {
	Address string
}

func NewRealtimeConfigFromEnv() (r RealtimeConfig) {
	var ok bool
	r.Address, ok = os.LookupEnv("REALTIME_SERVER_ADDRESS")
	if !ok {
		log.Fatal("REALTIME_SERVER_ADDRESS is not set")
	}
	return
}
