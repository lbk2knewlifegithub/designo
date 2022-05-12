package handlers

import (
	"context"
	"log"

	"frontendmentor/dto"
	"frontendmentor/repo"
	fmSV "frontendmentor/service"
	"shared/middleware"
	"shared/models"
	sv "shared/services"
	"shared/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v4"
)

// Create Solution
func createSolution(ctx *fiber.Ctx) error {
	// Validate Challenge DTO
	var createSolutionDTO dto.CreateSolutionDTO
	ctx.BodyParser(&createSolutionDTO)
	if err := utils.Validate(createSolutionDTO); err != nil {
		log.Println(err)
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
	}

	// Connect To Database
	conn, err := sv.Database.Connect()
	if err != nil {
		log.Println(err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	userToken := ctx.Locals("user").(*models.UserToken)
	// TODO : check only allow premium user to make solution is private

	// Start Transaction
	tx, err := conn.BeginTx(context.Background(), pgx.TxOptions{})
	if err != nil {
		log.Println(err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}
	defer tx.Rollback(context.Background())

	// Generate Screenshot
	screenshotPath, err := fmSV.Screenshot.TakeScreenShot(&createSolutionDTO.LiveSiteURL)
	if err != nil {
		return err
	}

	// Generate Report
	issues, err := fmSV.Report.GenerateReport(&createSolutionDTO.LiveSiteURL)
	if err != nil {
		return err
	}

	// Save Report To Database

	// Create Solution
	solutionID, err := repo.Solution.CreateSolution(
		tx,
		&userToken.ID,
		&screenshot,
		&createSolutionDTO)
	if err != nil {
		return err
	}

	// Commit
	err = tx.Commit(context.Background())
	if err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}
	return ctx.Status(fiber.StatusCreated).JSON(fiber.Map{
		"id": *solutionID,
	})
}

func SolutionHandlers(a *fiber.App) {

	// Get All Challenges
	challenge := a.Group("/solution")
	// Create Solution
	challenge.Post("/", middleware.AuthMiddleware, createSolution)
}
