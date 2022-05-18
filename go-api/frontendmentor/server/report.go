package server

import (
	"log"
	middleware "shared/middleware"

	"frontendmentor/dto"
	fmSV "frontendmentor/service"

	sv "shared/services"
	"shared/utils"

	"github.com/gofiber/fiber/v2"
)

// Get Report
func getReport(ctx *fiber.Ctx) error {
	// Get solutionID
	solutionID := ctx.Params("id")
	validUUID := utils.IsValidUUID(&solutionID)
	if !validUUID {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "missing solutionID, or invalid solutionID"})
	}

	// Connect To Database
	conn, err := sv.Database.Connect()
	if err != nil {
		log.Println("GetReport Handler Connect To Database Error: ", err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	reports, err := repo.Report.GetReports(conn, &solutionID)

	if err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	return ctx.Status(fiber.StatusOK).JSON(reports)
}

// Generate A11y
func a11y(ctx *fiber.Ctx) error {
	var createReportDTO dto.CreateReportDTO
	ctx.BodyParser(&createReportDTO)
	if err := utils.Validate(createReportDTO); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
	}

	// Connect To Database
	conn, err := sv.Database.Connect()
	if err != nil {
		log.Println("GenerateA11yReport Handler Connect To Database Error: ", err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Generate A11y
	issuses, err := fmSV.Report.A11y(&createReportDTO.URL)
	if err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Save Report A11y to database
	if len(*issuses) > 0 {
		err = repo.Issue.CreateA11y(conn, &createReportDTO.ReportID, issuses)
		if err != nil {
			return ctx.SendStatus(fiber.StatusInternalServerError)
		}

		return ctx.Status(fiber.StatusCreated).JSON(issuses)
	}

	return ctx.Status(fiber.StatusCreated).Send([]byte("[]"))
}

// Generate HtmlValidator
func htmlValidator(ctx *fiber.Ctx) error {
	var createReportDTO dto.CreateReportDTO
	ctx.BodyParser(&createReportDTO)
	if err := utils.Validate(createReportDTO); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
	}

	// Connect To Database
	conn, err := sv.Database.Connect()
	if err != nil {
		log.Println("GetReport Handler Connect To Database Error: ", err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Generate HtmlValidator
	issuses, err := fmSV.Report.HtmlValidator(&createReportDTO.URL)
	if err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	if len(*issuses) > 0 {

		// Save Report Html to database
		err = repo.Issue.CreateHtmlValidators(conn, &createReportDTO.ReportID, issuses)
		if err != nil {
			return ctx.SendStatus(fiber.StatusInternalServerError)
		}

		return ctx.Status(fiber.StatusCreated).JSON(issuses)
	}
	return ctx.Status(fiber.StatusCreated).Send([]byte("[]"))
}

func ReportHandleres(a *fiber.App) {
	// Get All Challenges
	report := a.Group("/reports")

	// Get Solution
	report.Get("/solution/:id", middleware.AuthMiddleware, getReport)

	// Generate A11y
	report.Post("/solution/a11y", middleware.AuthMiddleware, a11y)

	// HtmlValidator
	report.Post("/solution/html-validator", middleware.AuthMiddleware, htmlValidator)
}
