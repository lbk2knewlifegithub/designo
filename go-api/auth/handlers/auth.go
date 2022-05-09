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
		log.Println("GetUserGithub Error", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid code",
		})
	}

	// Check user Exist
	if userID, admin := repo.UserExists(conn, &userGithub.Login); *userID != "" {
		log.Println("user exists ", *userID) // Hash Token
		token, err := sv.JWT.Hash(userID, admin)
		if err != nil {
			log.Println(err)
			return c.SendStatus(fiber.StatusInternalServerError)
		}
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{"token": *token})
	}

	// Save User to database
	userID, err := repo.CreateUser(conn, userGithub)
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	// Hash Token
	admin := false
	token, err := sv.JWT.Hash(userID, &admin)
	if err != nil {
		return err
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"token": *token})
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
		return ctx.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "user not found",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(*user)
}

// PublicRoutes func for describe group of public routes.
func AuthHandler(a *fiber.App) {
	// Create routes group.

	// Routes for GET method:
	a.Get("/login/github", loginGithub)

	a.Get("/me", middleware.AuthMiddleware, me)
}
