package handlers

import (
	"auth/repo"
	"log"

	"shared/middleware"
	"shared/models"
	sv "shared/services"

	"github.com/gofiber/fiber/v2"
)

// Login Github
func loginGithub(c *fiber.Ctx) error {
	// Connect To Database
	conn, err := sv.Database.Connect()
	if err != nil {
		log.Println(err)
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	// Get Code
	code := c.Query("code")
	if code == "" {
		return c.Status(400).JSON(fiber.Map{
			"error": "code is required",
		})
	}

	// Get user Github
	userGithub, err := sv.Github.GetUser(&code)
	if err != nil {
		log.Println(err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid code",
		})
	}

	// Check user Exist
	if userId := repo.UserExists(conn, &userGithub.Login); userId != nil {
		log.Println("user exists ", userId)
		// Hash Token
		token, err := sv.JWT.Hash(userId, false)
		if err != nil {
			log.Println(err)
			return c.SendStatus(fiber.StatusInternalServerError)
		}
		return c.Status(fiber.StatusCreated).SendString(*token)
	}

	// Save User to database
	userId, err := repo.CreateUser(conn, userGithub)
	if err != nil {
		log.Println(err)
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	// Hash Token
	token, err := sv.JWT.Hash(userId, false)
	if err != nil {
		log.Println(err)
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.Status(fiber.StatusCreated).SendString(*token)
}

func me(ctx *fiber.Ctx) error {
	// Connect To Database
	conn, err := sv.Database.Connect()
	if err != nil {
		log.Println(err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	userToken := ctx.Locals("user").(*models.UserToken)

	// Get User Auth By Id
	user, err := repo.GetUserAuthById(conn, &userToken.Id)

	if err != nil {
		log.Println(err)
		return ctx.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "user not found",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(*user)
}

// PublicRoutes func for describe group of public routes.
func AuthHandler(a *fiber.App) {
	// Create routes group.
	route := a.Group("/v1")

	// Routes for GET method:
	route.Get("/login/github", loginGithub)

	route.Get("/me", middleware.AuthMiddleware, me)
}