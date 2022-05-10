package utils

import "os"

// exists returns whether the given file or directory exists
func Exists(path *string) bool {
	_, err := os.Stat(*path)
	if err != nil {
		return false
	}

	if os.IsNotExist(err) {
		return false
	}

	return true
}
