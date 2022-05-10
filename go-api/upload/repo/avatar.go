package repo

import (
	"context"
	"log"

	"github.com/jackc/pgx/v4"
)

var Avatar *avatar = &avatar{}

type avatar struct{}

// Get Avatar
func (a *avatar) GetAvatar(conn *pgx.Conn, userID *string) (*string, error) {
	query := `SELECT u.avatar FROM public.users u WHERE u.user_id = $1;`
	row := conn.QueryRow(context.Background(), query, *userID)

	var avatar string

	if err := row.Scan(avatar); err != nil {
		if err == pgx.ErrNoRows {
			return &avatar, nil
		}

		log.Println("GetAvatar Scan Error: ", err)
		return nil, err
	}

	return &avatar, nil
}

// Update Avatar
func (a *avatar) UpdateAvatar(conn *pgx.Conn, userID *string, av *string) error {
	query := `UPDATE public.users SET avatar = $1 WHERE user_id = $2;`
	if _, err := conn.Exec(context.Background(), query, *av, *userID); err != nil {
		log.Println("UpdateAvatar Error: ", err)
		return err
	}

	return nil
}
