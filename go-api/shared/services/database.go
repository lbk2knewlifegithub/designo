package services

import (
	"context"
	"fmt"
	"os"
	"strconv"

	"shared/utils"

	"github.com/jackc/pgx/v4"
)

var Database database

type database struct {
	url string
}

func init() {
	// Load env
	utils.LoadEnv()

	// Get host time from env.
	host := os.Getenv("DB_HOST")
	if host == "" {
		panic("DB_HOST must be number")
	}

	// Get username from env.
	username := os.Getenv("DB_USERNAME")
	if username == "" {
		panic("DB_USERNAME is not set")
	}

	// Get password from env.
	password := os.Getenv("DB_PASSWORD")
	if password == "" {
		panic("DB_PASSWORD is not set")
	}

	// Get dbName from env.
	dbName := os.Getenv("DB_NAME")
	if dbName == "" {
		panic("DB_NAME is not set")
	}

	port, err := strconv.ParseUint(os.Getenv("DB_PORT"), 10, 64)
	if err != nil {
		panic("DB_PORT must be number")
	}

	// Url
	url := fmt.Sprintf("postgres://%v:%v@%v:%v/%v", username, password, host, port, dbName)

	Database = database{
		url: url,
	}
}

func (db database) Connect() (*pgx.Conn, error) {
	return pgx.Connect(context.Background(), db.url)
}
