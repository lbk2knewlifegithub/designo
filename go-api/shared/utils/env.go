package utils

import (
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	pwd, _ := os.Getwd()
	path := pwd + "/../.env"

	godotenv.Load(path)
}
