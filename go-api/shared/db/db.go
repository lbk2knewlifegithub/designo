package db

import (
	"database/sql"
	"log"
	"os"
)

const (
	driverName = "postgres"
)

type Database struct {
	// Database Source
	DBSource string `mapstructure:"DB_SOURCE"`
}

func NewDatabaseFromEnv() (db Database) {
	var ok bool
	db.DBSource, ok = os.LookupEnv("DB_SOURCE")
	if !ok {
		log.Fatal("DB_SOURCE is not set")
	}

	defer func(connect *sql.DB) {
		err := connect.Close()
		if err != nil {
			log.Println("test connect to database error", err)
		}
	}(db.Connect())

	return
}

func (d Database) Connect() *sql.DB {
	conn, err := sql.Open(driverName, d.DBSource)
	if err != nil {
		log.Fatal("cannot connect to db:", err)
	}
	return conn
}
