package main

import (
	"go.uber.org/zap"
)

var logger *zap.Logger

func main() {
	logger, _ = zap.NewDevelopment()
	something()
}

func something() {
	logger.Debug("debug message")
	logger.Error("banana")
}
