package repo

import (
	"context"
	"log"
)

// Check user exist
func (u *user) UserExists(tx pgx.Tx, username *string) (*string, *bool, error) {
	query := "SELECT user_id, admin FROM public.users WHERE username = $1;"
	row := tx.QueryRow(context.Background(), query, *username)

	var userId string
	var admin bool

	err := row.Scan(&userId, &admin)
	if err != nil {
		log.Println("UserExists Scan Error: ", err)
		return nil, nil, err
	}

	return &userId, &admin, nil
}
