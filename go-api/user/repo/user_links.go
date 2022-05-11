package repo

import (
	"context"
	"log"

	"shared/models"

	"github.com/jackc/pgx/v4"
)

var UserLinks *userLinks = &userLinks{}

type userLinks struct{}

func (u *userLinks) CreateUserLink(tx pgx.Tx, userID *string, userLinks *models.UserLinks) error {
	query := `
	INSERT INTO public.user_links
		(github, 
		twitter, 
		dev_to, 
		hashnode, 
		codepen, 
		twitch,
		stack_over_flow,
		gitlab, 
		free_code_camp,
		medium,
		youtube,
		codewars, 
		linked_in, 
		user_id)
	VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);
	`

	_, err := tx.Exec(context.Background(), query,
		userLinks.Github,
		userLinks.Twitter,
		userLinks.DevTo,
		userLinks.HashNode,
		userLinks.Codepen,
		userLinks.Twitch,
		userLinks.StackOverFlow,
		userLinks.Gitlab,
		userLinks.FreeCodeCamp,
		userLinks.Medium,
		userLinks.Youtube,
		userLinks.Codewars,
		userLinks.LinkedIn,
		userID,
	)

	if err != nil {
		log.Println("CreateUserLink Error: ", err)
		return err
	}
	return nil
}

// Update User Links
func (u *userLinks) UpdateUserLinks(tx pgx.Tx, userID *string, userLinks *models.UserLinks) error {
	query := `
		UPDATE public.user_links
		SET
			github = $1,
			twitter = $2,
			dev_to = $3,
			hashnode = $4,
			codepen = $5,
			twitch = $6,
			stack_over_flow = $7,
			gitlab = $8,
			free_code_camp = $9,
			medium = $10,
			youtube = $11,
			codewars = $12,
			linked_in = $13
		WHERE user_id = $14;
	 `

	_, err := tx.Exec(context.Background(), query,
		// Params
		userLinks.Github,
		userLinks.Twitter,
		userLinks.DevTo,
		userLinks.HashNode,
		userLinks.Codepen,
		userLinks.Twitch,
		userLinks.StackOverFlow,
		userLinks.Gitlab,
		userLinks.FreeCodeCamp,
		userLinks.Medium,
		userLinks.Youtube,
		userLinks.Codewars,
		userLinks.LinkedIn,
		userID,
	)

	if err != nil {
		log.Println("UpdateUserLinks Repo Error: ", err)
		return err
	}

	return nil
}

// Delete UserLinks
func (u *userLinks) DeleteUserLinks(tx pgx.Tx, userID *string) error {
	query := `
	DELETE FROM public.user_links WHERE user_id = $1;
	`

	_, err := tx.Exec(context.Background(), query,
		userID,
	)

	if err != nil {
		log.Println("DeleteUserLinks Repo Error: ", err)
		return err
	}
	return nil
}
