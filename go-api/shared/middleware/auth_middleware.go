package middleware

import (
	sv "shared/services"

	"github.com/gofiber/fiber/v2"
)

// Try Login Middleware
// When Logged in , will set context.Locals to user
// If user is not logged in, will do nothing
func TryLoginMiddleware(c *fiber.Ctx) error {
	token := c.Get("Authorization")

	if token != "" {
		userToken, err := sv.JWT.Decode(&token)

		if err == nil {
			c.Locals("user", userToken)
		}
	}

	// Go to next middleware:
	return c.Next()
}

// Auth Middleware
func AuthMiddleware(c *fiber.Ctx) error {
	token := c.Get("Authorization")

	// Check token exist
	if token == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "token not found",
		})
	}

	userToken, err := sv.JWT.Decode(&token)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "token invalid",
		})
	}

	c.Locals("user", userToken)

	// Go to next middleware:
	return c.Next()
}

// Admin Middleware
func AdminMiddleware(c *fiber.Ctx) error {
	token := c.Get("Authorization")
	// Check token exist
	if token == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "token not found",
		})
	}

	userToken, err := sv.JWT.Decode(&token)

	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "token invalid",
		})
	}

	// Check user is Admin
	if !userToken.Admin {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
			"error": "only admin can access",
		})
	}

	c.Locals("user", userToken)

	// Go to next middleware:
	return c.Next()
}
