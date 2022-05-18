package server

import (
	"context"
	"log"
	middleware "shared/middleware"

	"frontendmentor/dto"
	"shared/models"
	"shared/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v4"
)

// const allChallengesKey = "allChallenges"
// const getChallengeKey = "getChallenge"

// All Challenges
func (s *Server) allChallenges(ctx *fiber.Ctx) error {
	// Connect To Database
	conn, err := sv.Database.Connect()
	if err != nil {
		log.Println(err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	userToken := ctx.Locals("user")
	// Get Challenges for Authenticated user
	if userToken != nil {
		userToken := userToken.(*models.UserToken)
		// Get all challenges
		challenges, err := repo.Challenge.AllChallengeWithUserID(conn, &userToken.ID)
		if err != nil {
			return err
		}
		return ctx.Status(fiber.StatusOK).JSON(challenges)
	}

	// Get Challenges for Unauthenticated user
	challenges, err := repo.Challenge.AllChallenges(conn)
	if err != nil {
		return err
	}
	return ctx.Status(fiber.StatusOK).JSON(challenges)
}

// Get Challenge
func getChallenge(ctx *fiber.Ctx) error {
	// Get challengeID
	challengeID := ctx.Params("id")
	if challengeID == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Challenge ID is required"})
	}

	// Connect To Database
	conn, err := sv.Database.Connect()
	if err != nil {
		log.Println(err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}
	userToken := ctx.Locals("user")
	// Get Challenge for Authenticated user
	if userToken != nil {
		userToken := userToken.(*models.UserToken)
		challenge, err := repo.Challenge.GetChallengeWithUserID(conn, &userToken.ID, &challengeID)
		if err != nil {
			return err
		}
		return ctx.Status(fiber.StatusOK).JSON(challenge)
	}

	// Get Challenge for Unauthenticated user
	challenge, err := repo.Challenge.GetChallenge(conn, &challengeID)
	if err != nil {
		return err
	}

	return ctx.Status(fiber.StatusOK).JSON(challenge)

}

// Create Challenge
func createChallenge(ctx *fiber.Ctx) error {
	// Validate Challenge DTO
	var createChallengeDTO dto.CreateChallengeDTO
	ctx.BodyParser(&createChallengeDTO)
	if err := utils.Validate(createChallengeDTO); err != nil {
		log.Println(err)
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
	}

	// Connect To Database
	conn, err := sv.Database.Connect()
	if err != nil {
		log.Println(err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Start Transaction
	tx, err := conn.BeginTx(context.Background(), pgx.TxOptions{})
	if err != nil {
		log.Println(err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}
	defer tx.Rollback(context.Background())

	// Create Challenge
	challengeID, err := repo.Challenge.CreateChallenge(tx, &createChallengeDTO)
	if err != nil {
		return err
	}

	// Create Gallery
	err = repo.Image.CreateImages(tx, challengeID, &createChallengeDTO.Gallery)
	if err != nil {
		return err
	}

	// Create Languages
	err = repo.Language.CreateLangauges(tx, challengeID, &createChallengeDTO.Languages)
	if err != nil {
		return err
	}

	// Commted
	err = tx.Commit(context.Background())
	if err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	return ctx.SendStatus(fiber.StatusCreated)
}

// Start Challenge
func startChallenge(ctx *fiber.Ctx) error {
	// Connect To Database
	conn, err := sv.Database.Connect()
	if err != nil {
		log.Println(err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	challengeID := ctx.Params("id")
	userToken := ctx.Locals("user").(*models.UserToken)

	err = repo.Challenge.StartChallenge(conn, &userToken.ID, &challengeID)
	if err != nil {
		return err
	}

	return ctx.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "start challenge success",
	})
}

func ChallengeHandlers(a *fiber.App) {
	// Create routes group.

	// Get All Challenges
	a.Get("/challenges", middleware.TryLoginMiddleware, allChallenges)
	challenge := a.Group("/challenge")

	// Get Challenge
	challenge.Get("/:id", middleware.TryLoginMiddleware, getChallenge)

	// Create Challenge
	challenge.Post("/", middleware.AdminMiddleware, createChallenge)
	// Start Challenge
	challenge.Post("/:id/start", middleware.AuthMiddleware, startChallenge)
}
