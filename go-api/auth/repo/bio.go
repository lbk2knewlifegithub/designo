package repo

import (
	"context"
	"log"

	"shared/models"

	"github.com/jackc/pgx/v4"
)

var Bio *bio = &bio{}

type bio struct{}

// Create Bio
func (b *bio) CreateBio(tx pgx.Tx, userID *string, bio *models.Bio) error {
	query := `
	INSERT INTO public.bio
		(website, 
		content, 
		current_learning,
		user_id)
	VALUES($1, $2, $3, $4);
	`

	if _, err := tx.Exec(context.Background(), query,
		bio.Website,
		bio.Content,
		bio.CurrentLearning,
		*userID,
	); err != nil {
		log.Println("CreateBio Repo Error: ", err)
		return err
	}

	return nil
}

// Update Bio
func (b *bio) UpdateBio(tx pgx.Tx, userID *string, bio *models.Bio) error {
	query := `
		UPDATE public.bio
		SET
			website = $1,
			current_learning = $2,
			content = $3
		WHERE user_id = $4;
	 `

	_, err := tx.Exec(context.Background(), query,
		// Params
		bio.Website,
		bio.CurrentLearning,
		bio.Content,
		userID,
	)

	if err != nil {
		log.Println("UpdateUserBio Repo Error: ", err)
		return err
	}

	return nil
}

// Delete Bio
func (b *bio) DeleteBio(tx pgx.Tx, userID *string) error {
	query := `
	DELETE FROM public.bio WHERE user_id = $1;
	`

	_, err := tx.Exec(context.Background(), query,
		userID,
	)

	if err != nil {
		log.Println("DeleteBio Repo Error: ", err)
		return err
	}
	return nil
}
