package utils

import (
	"log"
	"path/filepath"
	"runtime"
	"strings"
)

var (
	LogE = log.New(logWriter{}, "ERROR: ", 0)
	LogW = log.New(logWriter{}, "WARN: ", 0)
	LogI = log.New(logWriter{}, "INFO: ", 0)
	LogD = log.New(logWriter{}, "DEBUG: ", 0)
)

type logWriter struct{}

func (f logWriter) Write(p []byte) (n int, err error) {
	pc, file, line, ok := runtime.Caller(4)
	if !ok {
		file = "?"
		line = 0
	}

	fn := runtime.FuncForPC(pc)
	var fnName string
	if fn == nil {
		fnName = "?()"
	} else {
		dotName := filepath.Ext(fn.Name())
		fnName = strings.TrimLeft(dotName, ".") + "()"
	}

	log.Printf("%s:%d %s: %s", filepath.Base(file), line, fnName, p)
	return len(p), nil
}
