package repo

import (
	"context"
	"errors"
	"frontendmentor/dto"
	"frontendmentor/models"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgconn"
	"github.com/jackc/pgx/v4"
)

type challenge struct{}

var Challenge *challenge = &challenge{}

// Get All Challenges With User ID
func (ch *challenge) AllChallenges(conn *pgx.Conn) (*[]models.Challenge, error) {
	query := `
	SELECT 
		challenge_id,  
		(SELECT count(*) 
		FROM public.users_challenges uc 
		WHERE uc.challenge_id = c.challenge_id) AS started_count, 

		(SELECT count(*) 
		FROM public.users_challenges uc 
		WHERE uc.completed = true AND uc.challenge_id = c.challenge_id) AS completed_count, 

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
		(SELECT jsonb_agg(row.name) FROM (SELECT 
				l.name 
			FROM public.languages l 
			WHERE l.challenge_id = c.challenge_id) AS row) AS languages,

		(SELECT jsonb_agg(row) FROM (SELECT 
				i.preview, 
				i.design, 
				i.title 
			FROM public.images i 
			WHERE i.challenge_id = c.challenge_id) AS row) AS gallery
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
			log.Println("AllChallenges Err Scan", err)
			return nil, fiber.ErrInternalServerError
		}

		challenges = append(challenges, challenge)
	}

	return &challenges, nil
}

// Get All Challenges With User ID
func (ch *challenge) AllChallengeWithUserID(conn *pgx.Conn, userID *string) (*[]models.Challenge, error) {
	query := `
	SELECT 
		challenge_id,  
		(SELECT count(*) 
		FROM public.users_challenges uc 
		WHERE uc.challenge_id = c.challenge_id) AS started_count, 

		(SELECT count(*) 
		FROM public.users_challenges uc 
		WHERE uc.completed = true AND uc.challenge_id = c.challenge_id) AS completed_count, 

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
		(SELECT jsonb_agg(row.name) FROM (SELECT 
				l.name 
			FROM public.languages l 
			WHERE l.challenge_id = c.challenge_id) AS row) AS languages,

		(SELECT jsonb_agg(row) FROM (SELECT 
				i.preview, 
				i.design, 
				i.title 
			FROM public.images i 
			WHERE i.challenge_id = c.challenge_id) AS row) AS gallery,
		(SELECT 
			CASE 
				WHEN completed = true  THEN 'completed'
				WHEN completed = false  THEN 'in-progress'
			ELSE NULL
			END AS status
		FROM public.users_challenges uc
		WHERE uc.user_id=$1 AND uc.challenge_id = c.challenge_id) AS status
	FROM public.challenges AS c;
	`

	rows, err := conn.Query(context.Background(), query, *userID)

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
			&challenge.Status,
		); err != nil {
			log.Println("AllChallengeWithUserID Error Scan", err)
			return nil, fiber.ErrInternalServerError
		}

		challenges = append(challenges, challenge)
	}

	return &challenges, nil
}

// Get Challenge With User ID
func (ch *challenge) GetChallengeWithUserID(conn *pgx.Conn, userID *string, challengeID *string) (*models.Challenge, error) {
	log.Println(*challengeID)
	query := `
	SELECT 
		challenge_id,  

		(SELECT count(*) 
		FROM public.users_challenges uc 
		WHERE uc.challenge_id = $1) AS started_count, 

		(SELECT count(*) 
		FROM public.users_challenges uc 
		WHERE uc.completed = true AND uc.challenge_id = $1) AS completed_count, 

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
		(SELECT jsonb_agg(row.name) FROM (SELECT 
				l.name 
			FROM public.languages l 
			WHERE l.challenge_id = c.challenge_id) AS row) AS languages,

		(SELECT jsonb_agg(row) FROM (SELECT 
				i.preview, 
				i.design, 
				i.title 
			FROM public.images i 
			WHERE i.challenge_id = c.challenge_id) AS row) AS gallery,

		(SELECT 
			CASE 
				WHEN completed = true  THEN 'completed'
				WHEN completed = false  THEN 'in-progress'
			ELSE NULL
			END AS status
		FROM public.users_challenges uc
		WHERE uc.user_id = $2 AND uc.challenge_id = c.challenge_id) AS status

	FROM public.challenges AS c WHERE c.challenge_id = $1;
	`

	row := conn.QueryRow(context.Background(), query, *challengeID, *userID)
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
		&challenge.Status,
	); err != nil {
		log.Println("GetChallengeWithUserID Error Scan", err)
		return nil, fiber.ErrInternalServerError
	}

	return &challenge, nil
}

// Get Challenge
func (ch *challenge) GetChallenge(conn *pgx.Conn, challengeID *string) (*models.Challenge, error) {
	query := `
	SELECT 
		challenge_id,  
		(SELECT count(*) 
		FROM public.users_challenges uc 
		WHERE uc.challenge_id = $1) AS started_count, 

		(SELECT count(*) 
		FROM public.users_challenges uc 
		WHERE uc.completed = true AND uc.challenge_id = $1) AS completed_count, 

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
		(SELECT jsonb_agg(row.name) FROM (SELECT 
				l.name 
			FROM public.languages l 
			WHERE l.challenge_id = c.challenge_id) AS row) AS languages,

		(SELECT jsonb_agg(row) FROM (SELECT 
				i.preview, 
				i.design, 
				i.title 
			FROM public.images i 
			WHERE i.challenge_id = c.challenge_id) AS row) AS gallery

	FROM public.challenges AS c WHERE c.challenge_id = $1;
	`

	row := conn.QueryRow(context.Background(), query, *challengeID)
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

// StartChallenge
func (challenge *challenge) StartChallenge(conn *pgx.Conn, userID *string, challengeID *string) error {

	query := `
	INSERT INTO public.users_challenges(
		user_id,
		challenge_id)
	VALUES($1, $2)`

	if _, err := conn.Exec(context.Background(), query,
		*userID,
		*challengeID,
	); err != nil {
		var pgErr *pgconn.PgError
		errors.As(err, &pgErr)

		if pgErr.Code == "23505" {
			return fiber.ErrConflict
		}

		log.Println("StartChallenge  Error:", err.Error())
		return fiber.ErrInternalServerError
	}

	return nil
}
