package main

import (
	"log"
	"shared/middleware"

	"frontendmentor/handlers"

	"github.com/goccy/go-json"
	"github.com/gofiber/fiber/v2"
)

func main() {
	host := "0.0.0.0:8084"

	app := fiber.New(fiber.Config{
		JSONEncoder: json.Marshal,
		JSONDecoder: json.Unmarshal,
	})

	// Register Middleware
	middleware.FiberMiddleware(app)

	// Register Handler
	handlers.ChallengeHandlers(app)

	log.Println("Server started on ", host)
	log.Fatal(app.Listen(host))
}
