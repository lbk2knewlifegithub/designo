package main

import (
	"github.com/gofiber/fiber/v2"
)

func main() {
	router := fiber.New()
	router.Static("/public", "./public")
	router.Get("/", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(fiber.Map{
			"something": "something",
		})
	})
	router.Listen("0.0.0.0:9090")
}
