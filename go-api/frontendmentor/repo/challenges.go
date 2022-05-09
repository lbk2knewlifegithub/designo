package repo

import (
	"context"
	"frontendmentor/dto"
	"frontendmentor/models"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v4"
)

type challenge struct{}

var Challenge *challenge = &challenge{}

// GetChallenges returns all challenges.
func (ch *challenge) AllChallenge(conn *pgx.Conn) (*[]models.Challenge, error) {

	query := `
	SELECT 
		challenge_id,  
		(SELECT count(*) FROM public.users_challenges) AS started_count, 
		(SELECT count(*) FROM public.users_challenges uc WHERE uc.completed = true) AS completed_count, 
		title,
		hero_image, 
		description,
		brief,
		created_at, 
		updated_at, 
		starter_url, 
		type,
		difficulty,
		steps, 
		ideas,
		(SELECT jsonb_agg(row.name) FROM (SELECT l.name FROM public.languages l WHERE l.challenge_id = c.challenge_id) AS row) AS languages,
		(SELECT jsonb_agg(row) FROM (SELECT i.preview, i.design, i.title FROM public.images i WHERE i.challenge_id = c.challenge_id) AS row) AS gallery
	FROM public.challenges AS c;
	`

	rows, err := conn.Query(context.Background(), query)

	if err != nil {
		log.Println("AllChallenge Err Execute Query", err)
		return nil, fiber.ErrInternalServerError
	}

	defer rows.Close()

	challenges := []models.Challenge{}

	for rows.Next() {
		var challenge models.Challenge
		if err = rows.Scan(
			&challenge.ID,
			&challenge.StartedCount,
			&challenge.CompletedCount,
			&challenge.Title,
			&challenge.HeroImage,
			&challenge.Description,
			&challenge.Brief,
			&challenge.CreatedAt,
			&challenge.UpdatedAt,
			&challenge.StarterURL,
			&challenge.ChallengeType,
			&challenge.Difficulty,
			&challenge.Steps,
			&challenge.Ideas,
			&challenge.Languages,
			&challenge.Gallery,
		); err != nil {
			log.Println("AllChallenge Err Scan", err)
			return nil, fiber.ErrInternalServerError
		}

		challenges = append(challenges, challenge)
	}

	return &challenges, nil
}

// Get Challenge
func (ch *challenge) GetChallenge(conn *pgx.Conn, id *string) (*models.Challenge, error) {

	query := `
	SELECT 
		challenge_id,  
		(SELECT count(*) FROM public.users_challenges) AS started_count, 
		(SELECT count(*) FROM public.users_challenges uc WHERE uc.completed = true) AS completed_count, 
		title,
		hero_image, 
		description,
		brief,
		created_at, 
		updated_at, 
		starter_url, 
		type,
		difficulty,
		steps, 
		ideas,
		(SELECT jsonb_agg(row.name) FROM (SELECT l.name FROM public.languages l WHERE l.challenge_id = c.challenge_id) AS row) AS languages,
		(SELECT jsonb_agg(row) FROM (SELECT i.preview, i.design, i.title FROM public.images i WHERE i.challenge_id = c.challenge_id) AS row) AS gallery
	FROM public.challenges AS c WHERE c.challenge_id = $1;
	`

	row := conn.QueryRow(context.Background(), query, *id)
	var challenge models.Challenge

	if err := row.Scan(
		&challenge.ID,
		&challenge.StartedCount,
		&challenge.CompletedCount,
		&challenge.Title,
		&challenge.HeroImage,
		&challenge.Description,
		&challenge.Brief,
		&challenge.CreatedAt,
		&challenge.UpdatedAt,
		&challenge.StarterURL,
		&challenge.ChallengeType,
		&challenge.Difficulty,
		&challenge.Steps,
		&challenge.Ideas,
		&challenge.Languages,
		&challenge.Gallery,
	); err != nil {
		log.Println("GetChallenge Err Scan", err)
		return nil, fiber.ErrInternalServerError
	}

	return &challenge, nil
}

// GetChallenges returns all challenges.
func (challenge *challenge) CreateChallenge(tx pgx.Tx, dto *dto.CreateChallengeDTO) (*string, error) {

	query := `
	INSERT INTO public.challenges(
		steps,
		ideas,
		brief,
		title, 
		hero_image, 
		description, 
		starter_url,
		type,
		difficulty)
	VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING challenge_id;`

	row := tx.QueryRow(context.Background(), query,
		dto.Steps,
		dto.Ideas,
		dto.Brief,
		dto.Title,
		dto.HeroImage,
		dto.Description,
		dto.StarterURL,
		dto.ChallengeType,
		dto.Difficulty,
	)

	var challengeID string

	if err := row.Scan(&challengeID); err != nil {
		log.Println("CreateChallenge  Err ", err)
		return nil, fiber.ErrInternalServerError
	}

	return &challengeID, nil
}
