package server

import (
	"context"
	"database/sql"
	"github.com/gofiber/fiber/v2"
	"os"
	"shared/token_maker"
	db "upload/db/sqlc"
	"upload/dto"
)

// Take Screenshot
func (s *Server) takeScreenshot(ctx *fiber.Ctx) error {
	// Validate Screenshot DTO
	var screenshotDTO dto.ScreenshotDTO
	err := ctx.BodyParser(&screenshotDTO)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
	}
	if err := s.validator.Validate(screenshotDTO); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
	}
	user := ctx.Locals("user").(*token_maker.Payload)
	// Get Old Screenshot
	screenshot, err := s.store.GetSolutionScreenshot(context.Background(), db.GetSolutionScreenshotParams{
		UserID:     user.ID,
		SolutionID: screenshotDTO.SolutionID,
	})
	if err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}
	// Remove Old Screenshot
	if screenshot.Valid {
		err := os.Remove(screenshot.String)
		if err != nil {
			return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
		}
	}

	// Take Screenshot
	newScreenshot := s.uploadConfig.Upload.CreateSaveScreenshotPath()
	err = s.image.TakeScreenshot(newScreenshot, &screenshotDTO.URL)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "url invalid",
		})
	}

	// Update Screenshot for Solution
	if err = s.store.UpdateSolutionScreenshot(context.Background(), db.UpdateSolutionScreenshotParams{
		Screenshot: sql.NullString{
			String: *newScreenshot,
			Valid:  true,
		},
		UserID:     user.ID,
		SolutionID: screenshotDTO.SolutionID,
	}); err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	return ctx.Status(fiber.StatusCreated).JSON(fiber.Map{
		"screenshot": newScreenshot,
	})
}

// Delete  Screenshot
func (s *Server) deleteScreenshot(ctx *fiber.Ctx) error {
	// Get Avatar File
	name := ctx.Params("name")
	if name == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "screenshot name  not found example: uuid.jpeg",
		})
	}

	// Save screenshot
	screenshotPath := s.config.Upload.CreateSaveScreenshotPath()
	err := os.Remove(*screenshotPath)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "screenshot not found",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "screenshot deleted",
	})
}
