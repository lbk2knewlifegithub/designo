package utils

import (
	"log"
	"time"
)

func Measure(name string) func() {
	t := time.Now()
	log.Println(name, " started")

	return func() {
		log.Println(name, " finished", time.Since(t))
	}
}
