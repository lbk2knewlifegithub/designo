package dto

import "github.com/google/uuid"

type ScreenshotDTO struct {
	URL        string    `json:"url" validate:"required,url" `
	SolutionID uuid.UUID `json:"solutionID" validate:"required,uuid" `
}
