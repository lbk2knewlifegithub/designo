package repo

import (
	"context"
	"frontendmentor/dto"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v4"
)

type solution struct{}

var Solution *solution = &solution{}

// Create Solution
func (s *solution) CreateSolution(
	tx pgx.Tx,
	userID *string,
	screenshot *string,
	dto *dto.CreateSolutionDTO) (*string, error) {

	query := `
	INSERT INTO public.solutions(
		title,
		repo_url,
		live_site_url,
		screenshot, 
		is_private, 
		questions, 
		user_id,
		challenge_id)
	VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING solution_id;`

	row := tx.QueryRow(context.Background(), query,
		dto.Title,
		dto.RepoURL,
		dto.LiveSiteURL,
		screenshot,
		dto.IsPrivate,
		dto.Questions,
		userID,
		dto.ChallengeID,
	)

	var solutionID string

	if err := row.Scan(&solutionID); err != nil {
		log.Println("CreateSolution  Error:", err)
		return nil, fiber.ErrInternalServerError
	}

	return &solutionID, nil
}
