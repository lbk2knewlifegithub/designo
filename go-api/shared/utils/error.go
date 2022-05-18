package utils

import "github.com/gofiber/fiber/v2"

func ErrorResponse(err error) map[string]interface{} {
	return fiber.Map{"error": err.Error()}
}
