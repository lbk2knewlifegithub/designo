package main

import (
	"log"
	"shared/middleware"
	"user/handlers"

	"github.com/goccy/go-json"
	"github.com/gofiber/fiber/v2"
)

func main() {

	app := fiber.New(fiber.Config{
		JSONEncoder: json.Marshal,
		JSONDecoder: json.Unmarshal,
	})

	middleware.FiberMiddleware(app)

	// // Routes.
	handlers.UserHandlers(app)

	log.Fatal(app.Listen(":8080"))
}
