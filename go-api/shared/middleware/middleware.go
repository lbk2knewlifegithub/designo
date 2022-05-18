package server

import (
	"github.com/gofiber/fiber/v2"
	"shared/token_maker"
)

// TryLoginMiddleware Try Login Middleware
// When Logged in , will set context.Locals to user
// If user is not logged in, will do nothing
func TryLoginMiddleware(token token_maker.TokenMaker) fiber.Handler {
	return func(c *fiber.Ctx) error {
		tokenReq := c.Get("Authorization")

		if tokenReq != "" {
			payload, err := token.Decode(&tokenReq)
			if err == nil {
				c.Locals("user", payload)
			}
		}

		// Go to next middleware:
		return c.Next()
	}
}

// Auth Middleware
func AuthMiddleware(token token_maker.TokenMaker) fiber.Handler {

	return func(c *fiber.Ctx) error {
		tokenReq := c.Get("Authorization")

		// Check token_maker exist
		if tokenReq == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "token_maker not found",
			})
		}

		payload, err := token.Decode(&tokenReq)
		if err != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "token_maker invalid",
			})
		}

		c.Locals("user", payload)

		// Go to next middleware:
		return c.Next()
	}
}

// Admin Middleware
func AdminMiddleware(token token_maker.TokenMaker) fiber.Handler {
	return func(c *fiber.Ctx) error {
		tokenReq := c.Get("Authorization")
		// Check token_maker exist
		if tokenReq == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "token_maker not found",
			})
		}

		payload, err := token.Decode(&tokenReq)

		if err != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "token_maker invalid",
			})
		}

		// Check user is Admin
		if !payload.Admin {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
				"error": "only admin can access",
			})
		}

		c.Locals("user", payload)

		// Go to next middleware:
		return c.Next()
	}
}
