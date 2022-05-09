package handlers

import (
	"context"
	"log"
	"time"

	"frontendmentor/dto"
	"frontendmentor/repo"
	"shared/middleware"
	sv "shared/services"
	"shared/utils"

	"github.com/goccy/go-json"
	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v4"
)

const allChallengesKey = "allChallenges"
const getChallengeKey = "getChallenge"

// All Challenges
func allChallenges(ctx *fiber.Ctx) error {
	// Get Cached
	cached := sv.Redis.Read.Get(context.Background(), allChallengesKey).Val()
	if cached != "" {
		return ctx.SendString(cached)
	}

	// Connect To Database
	conn, err := sv.Database.Connect()
	if err != nil {
		log.Println(err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Get all challenges
	challenges, err := repo.Challenge.AllChallenge(conn)
	if err != nil {
		return err
	}

	// Cache all challenges
	json, err := json.Marshal(challenges)
	if err != nil {
		log.Println("Marchal challenges Err ", err.Error())
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}
	if err := sv.Redis.Write.Set(context.Background(), allChallengesKey, json, 10*time.Minute).Err(); err != nil {
		log.Println("Set cached challenges Err ", err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	return ctx.Status(fiber.StatusOK).JSON(challenges)
}

// Get Challenge
func getChallenge(ctx *fiber.Ctx) error {
	// Get ID
	id := ctx.Params("id")
	if id == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Challenge ID is required"})
	}
	cacheKey := getChallengeKey + id

	// Get Cached
	cached := sv.Redis.Read.Get(context.Background(), cacheKey).Val()
	if cached != "" {
		return ctx.SendString(cached)
	}

	// Connect To Database
	conn, err := sv.Database.Connect()
	if err != nil {
		log.Println(err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Get challenge
	challenge, err := repo.Challenge.GetChallenge(conn, &id)
	if err != nil {
		return err
	}

	// Cache challenge
	json, err := json.Marshal(challenge)
	if err != nil {
		log.Println("Marchal challenge Err ", err.Error())
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}
	if err := sv.Redis.Write.Set(context.Background(), cacheKey, json, 10*time.Minute).Err(); err != nil {
		log.Println("Set cached challenge Err ", err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
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

func ChallengeHandlers(a *fiber.App) {
	// Create routes group.

	// Get All Challenges
	a.Get("/challenges", allChallenges)
	challenge := a.Group("/challenge")
	// Create Challenge
	challenge.Get("/:id", getChallenge)
	challenge.Post("/", middleware.AdminMiddleware, createChallenge)
}
