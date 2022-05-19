package main

import (
	"go.uber.org/zap"
	"testing"
)

func TestLemon(m *testing.T) {
	logger, _ := zap.NewDevelopment()
	logger.Debug("test")
}
