package server

import (
	"context"
	"log"
	middleware "shared/middleware"
	"user/repo"

	"shared/models"
	"shared/utils"
	"user/dto"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v4"
)

// Login Github
func (s *Server) loginGithub(ctx *fiber.Ctx) error {
	// Get Code
	code := ctx.Query("code")
	if code == "" {
		return ctx.Status(400).JSON(fiber.Map{
			"error": "code is required",
		})
	}

	// Get user Github
	userGithub, err := sv.Github.GetUser(&code)
	if err != nil {
		log.Println("GetUserGithub Error", err)
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid code",
		})
	}

	// Connect To Database
	conn, err := sv.Database.Connect()
	if err != nil {
		log.Println(err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	tx, err := conn.Begin(context.Background())
	if err != nil {
		log.Println("LoginGithub -> New Transaction Error: ", err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}
	defer tx.Rollback(context.Background())

	// Check user Exist
	userIDExist, adminExist, err := repo.User.UserExists(tx, &userGithub.Login)
	if err != nil && err != pgx.ErrNoRows {
		log.Println(err)
		log.Println(pgx.ErrNoRows)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	if userIDExist != nil {
		token, err := sv.JWT.Hash(userIDExist, adminExist)
		if err != nil {
			return ctx.SendStatus(fiber.StatusInternalServerError)
		}
		return ctx.Status(fiber.StatusCreated).JSON(fiber.Map{"token_maker": *token})
	}

	// Save User to database
	userID, err := repo.User.CreateUser(tx, userGithub)
	if err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Create Github Link
	if err = repo.UserLinks.CreateUserLink(
		tx,
		userID,
		&models.UserLinks{Github: userGithub.HTML_URL},
	); err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Create Default Bio
	if err = repo.Bio.CreateBio(
		tx,
		userID,
		&models.Bio{},
	); err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Create Default Email Settings
	if err = repo.User.CreateDefaultEmailSettings(
		tx,
		userID,
	); err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Hash Token
	admin := false
	token, err := sv.JWT.Hash(userID, &admin)
	if err != nil {
		return err
	}

	// Commit Change
	if err = tx.Commit(context.Background()); err != nil {
		log.Println("LoginGithub Handler -> Commit Error: ", err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	return ctx.Status(fiber.StatusCreated).JSON(fiber.Map{"token_maker": *token})
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
	user, err := repo.User.GetUserById(conn, &userToken.ID)
	if err != nil {
		return ctx.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "user not found",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(*user)
}

func updateProfile(ctx *fiber.Ctx) error {
	// Validate Update Profile DTO
	var updateProfileDTO dto.UpdateProfileDTO
	ctx.BodyParser(&updateProfileDTO)
	if err := utils.Validate(updateProfileDTO); err != nil {
		log.Println(err)
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
	}

	// Get  User Token
	userToken := ctx.Locals("user").(*models.UserToken)

	// Connect To Database
	conn, err := sv.Database.Connect()
	if err != nil {
		log.Println("UpdateUser -> Connect to database Error: ", err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	tx, err := conn.Begin(context.Background())
	if err != nil {
		log.Println("UpdateUser -> New Transaction Error: ", err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}
	defer tx.Rollback(context.Background())

	// Update User
	if err := repo.User.UpdateUser(tx, &userToken.ID, &updateProfileDTO); err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Update User Links
	if err := repo.UserLinks.UpdateUserLinks(tx, &userToken.ID, &updateProfileDTO.Links); err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Update User Bio
	if err := repo.Bio.UpdateBio(tx, &userToken.ID, &updateProfileDTO.Bio); err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	err = tx.Commit(context.Background())
	if err != nil {
		log.Println("UpdateUser -> Commit UpdateProfile Error: ", err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{"message": "update profile success"})
}

// Delete Account
func deleteAccount(ctx *fiber.Ctx) error {
	// Get  User Token
	userToken := ctx.Locals("user").(*models.UserToken)

	// Connect To Database
	conn, err := sv.Database.Connect()
	if err != nil {
		log.Println("DeleteAccount Handler -> Connect to database Error: ", err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	tx, err := conn.Begin(context.Background())
	if err != nil {
		log.Println("DeleteAccount Handler -> New Transaction Error: ", err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	defer tx.Rollback(context.Background())

	// Delete User On users Tables
	if err := repo.User.DeleteUser(tx, &userToken.ID); err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Delete User On user_links Tables
	if err := repo.UserLinks.DeleteUserLinks(tx, &userToken.ID); err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Delete User On bios Tables
	if err := repo.Bio.DeleteBio(tx, &userToken.ID); err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Delete Avatar
	avatar, err := uploadRepo.Avatar.GetAvatar(conn, &userToken.ID)
	if err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	if *avatar != "" {
		if err := uploadUtils.Image.DeleteAvatar(avatar); err != nil {
			return ctx.SendStatus(fiber.StatusInternalServerError)
		}
	}

	// Commit Change
	if err = tx.Commit(context.Background()); err != nil {
		log.Println("DeleteAccount Handler -> Commit Error: ", err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{"message": "success"})
}

// Update Email Settings
func updateEmailSettings(ctx *fiber.Ctx) error {
	// Validate Email Settings DTO
	var emailSettingsDTO models.EmailSettings
	ctx.BodyParser(&emailSettingsDTO)
	if err := utils.Validate(emailSettingsDTO); err != nil {
		log.Println("UpdateEmail Settings -> Validate EmailSettings Error: ", err)
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
	}

	// Get  User Token
	userToken := ctx.Locals("user").(*models.UserToken)

	// Connect To Database
	conn, err := sv.Database.Connect()
	if err != nil {
		log.Println("UpdateUser -> Connect to database Error: ", err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	tx, err := conn.Begin(context.Background())
	if err != nil {
		log.Println("UpdateUser -> New Transaction Error: ", err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}
	defer tx.Rollback(context.Background())

	// Update Email Settings
	if err := repo.User.UpdateEmailSettings(tx, &userToken.ID, &emailSettingsDTO); err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	err = tx.Commit(context.Background())
	if err != nil {
		log.Println("UpdateEmailSettings Repo -> Commit UpdateEmailSettings Error: ", err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{"message": "update email settings success"})
}

func UserHandlers(a *fiber.App) {
	// Create routes group.

	// Routes for GET method:
	a.Get("/login/oauth", loginGithub)

	// Get User Informtion
	a.Get("/me", middleware.AuthMiddleware, me)

	// Update Profile Handler
	a.Put("/me", middleware.AuthMiddleware, updateProfile)

	// Delete Account Handler
	a.Delete("/me", middleware.AuthMiddleware, deleteAccount)

	// Update Email Settings
	a.Put("/me/email-settings", middleware.AuthMiddleware, updateEmailSettings)
}
