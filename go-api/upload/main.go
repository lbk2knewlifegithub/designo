package main

import (
	"log"
	"shared/middleware"
	"upload/handlers"

	"github.com/goccy/go-json"
	"github.com/gofiber/fiber/v2"
)

func main() {
	host := "0.0.0.0:8081"
	// Fiber instance
	app := fiber.New(
		fiber.Config{
			BodyLimit:   1024 * 1024 * 4,
			JSONEncoder: json.Marshal,
			JSONDecoder: json.Unmarshal,
		},
	)

	// Register Middleware
	middleware.FiberMiddleware(app)

	// Register Handler
	handlers.StaticHandlers(app)
	handlers.UploadHandler(app)

	// Start server
	log.Fatal(app.Listen(host))
}
