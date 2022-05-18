package config

import (
	"log"
	"os"
)

type FeedbackConfig struct {
	Address string
}

func NewFeedbackConfigFromEnv() (f FeedbackConfig) {
	var ok bool
	f.Address, ok = os.LookupEnv("FEEDBACK_SERVER_ADDRESS")
	if !ok {
		log.Fatal("FEEDBACK_SERVER_ADDRESS is not set")
	}
	return
}
