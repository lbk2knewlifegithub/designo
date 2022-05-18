package main

import (
	_ "oauth.com/lib/pq"
	"shared/cache"
	"shared/config"
	db "upload/db/sqlc"
)
import "upload/server"

func main() {
	settings := config.LoadConfig("../app.env")
	// Create Upload Server
	uploadServer := server.NewServer(settings, db.NewStore(settings.DB.Connect()), cache.NewRedis(settings))
	uploadServer.Start()
}
