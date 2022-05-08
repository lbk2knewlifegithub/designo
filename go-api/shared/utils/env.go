package utils

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	pwd, _ := os.Getwd()
	path := pwd + "/../.env"

	if err := godotenv.Load(path); err != nil {
		panic(fmt.Sprintf("Error loading .env file with path %v", path))
	}
}
