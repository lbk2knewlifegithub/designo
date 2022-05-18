package server

import (
	"context"
	"log"
	middleware "shared/middleware"

	"frontendmentor/dto"
	"frontendmentor/repo"

	"shared/models"
	"shared/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v4"
)

// Submit Solution
func submitSolution(ctx *fiber.Ctx) error {
	// Validate Challenge DTO
	var createSolutionDTO dto.CreateSolutionDTO
	ctx.BodyParser(&createSolutionDTO)
	if err := utils.Validate(createSolutionDTO); err != nil {
		log.Println(err)
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
	}
	userToken := ctx.Locals("user").(*models.UserToken)
	// TODO : check only allow premium user to make solution is private

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

	// Check user take this challenge
	exist, err := repo.Challenge.IsTakeChallenge(tx, &userToken.ID, &createSolutionDTO.ChallengeID)
	if err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}
	if !exist {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "You don't take this challenge",
		})
	}

	// Check if user already submit solution
	submitted, err := repo.Solution.IsSubmitted(tx, &userToken.ID, &createSolutionDTO.ChallengeID)
	if err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}
	if submitted {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "You already submit solution",
		})
	}

	// Create Solution
	solutionID, err := repo.Solution.CreateSolution(
		tx,
		&userToken.ID,
		&createSolutionDTO)
	if err != nil {
		return err
	}

	// Create Empty Report
	reportID, err := repo.Report.CreateReport(
		tx,
		solutionID)
	if err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Create TagsSolutions
	if len(*createSolutionDTO.Tags) > 0 {
		err = repo.Tag.CreateTagsSolutions(tx, solutionID, createSolutionDTO.Tags)
		if err != nil {
			return ctx.SendStatus(fiber.StatusInternalServerError)
		}
	}

	// Commit
	err = tx.Commit(context.Background())
	if err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}
	return ctx.Status(fiber.StatusCreated).JSON(fiber.Map{
		"solutionID": solutionID,
		"reportID":   reportID,
	})
}

// Update Solution
func updateSolution(ctx *fiber.Ctx) error {
	// Validate UpdateSolutionDTO
	var updateSolutionDTO dto.UpdateSolutionDTO
	ctx.BodyParser(&updateSolutionDTO)
	if err := utils.Validate(updateSolutionDTO); err != nil {
		log.Println(err)
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
	}
	userToken := ctx.Locals("user").(*models.UserToken)
	solutionID := ctx.Params("id")
	if solutionID == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Solution ID is required"})
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
		log.Println("UpdateSolution Handler Start Transaction Error: ", err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}
	defer tx.Rollback(context.Background())

	// Update Solution
	err = repo.Solution.UpdateSolution(tx, &userToken.ID, &solutionID, &updateSolutionDTO)
	if err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Commit
	err = tx.Commit(context.Background())
	if err != nil {
		log.Println("UpdateSolution Handler Commit Error: ", err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Update solution success",
	})
}

// Delete Solution
func deleteSolution(ctx *fiber.Ctx) error {
	// Get solutionID
	solutionID := ctx.Params("id")
	validUUID := utils.IsValidUUID(&solutionID)
	if !validUUID {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "missing solutionID, or invalid solutionID"})
	}

	userToken := ctx.Locals("user").(*models.UserToken)

	// Connect To Database
	conn, err := sv.Database.Connect()
	if err != nil {
		log.Println(err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Delete Solution
	err = repo.Solution.DeleteSolution(conn, &userToken.ID, &solutionID)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Something went wrong, please try again"})
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Delete solution success",
	})
}

// Get Solution
func getSolution(ctx *fiber.Ctx) error {
	// Get solutionID
	solutionID := ctx.Params("id")
	validUUID := utils.IsValidUUID(&solutionID)
	if !validUUID {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "missing solutionID, or invalid solutionID"})
	}

	// Connect To Database
	conn, err := sv.Database.Connect()
	if err != nil {
		log.Println("GeSolution Handler Connect To Database Error: ", err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Start Transaction
	tx, err := conn.BeginTx(context.Background(), pgx.TxOptions{})
	if err != nil {
		log.Println("GetSolution Handler Start Transaction Error:", err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	userToken := ctx.Locals("user")

	// Get Solution for Authenticated user
	if userToken != nil {
		userToken := userToken.(*models.UserToken)
		solution, err := repo.Solution.GetSolutionWithUserID(tx, &userToken.ID, &solutionID)
		if err != nil {
			if err == pgx.ErrNoRows {
				return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Solution not found"})
			}

			return ctx.SendStatus(fiber.StatusInternalServerError)
		}
		return ctx.Status(fiber.StatusOK).JSON(solution)
	}

	// Get Solution for Unauthenticated user
	solution, err := repo.Solution.GetSolution(tx, &solutionID)
	if err != nil {
		if err == pgx.ErrNoRows {
			return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Solution not found"})
		}

		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	return ctx.Status(fiber.StatusOK).JSON(solution)
}

// Get All Solutions
func getAllSolutions(ctx *fiber.Ctx) error {
	// Connect To Database
	conn, err := sv.Database.Connect()
	if err != nil {
		log.Println("GetAllSolutions Handler Connect To Database Error: ", err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	userToken := ctx.Locals("user")

	// GetAllSolutions for Authenticated user
	if userToken != nil {
		userToken := userToken.(*models.UserToken)
		solutions, err := repo.Solution.GetAllSolutionsWithUserID(conn, &userToken.ID)
		if err != nil {
			return ctx.SendStatus(fiber.StatusInternalServerError)
		}
		return ctx.Status(fiber.StatusOK).JSON(solutions)
	}

	// GetAllSolutions for Unauthenticated user
	solutions, err := repo.Solution.GetAllSolutions(conn)
	if err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	return ctx.Status(fiber.StatusOK).JSON(solutions)
}

func SolutionHandlers(a *fiber.App) {
	solutions := a.Group("/solutions")
	solutions.Get("/", middleware.TryLoginMiddleware, getAllSolutions)

	solution := a.Group("/solution")

	// Submit Solution
	solution.Post("/", middleware.AuthMiddleware, submitSolution)

	// Get Solution
	solution.Get("/:id", middleware.TryLoginMiddleware, getSolution)

	// Update Solution
	solution.Put("/:id", middleware.AuthMiddleware, updateSolution)

	// Delete Solution
	solution.Delete("/:id", middleware.AuthMiddleware, deleteSolution)
}
