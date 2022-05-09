package repo

import (
	"context"
	"log"

	"shared/models"

	"github.com/jackc/pgx/v4"
)

func GetUsers(c *pgx.Conn) ([]models.UserProfile, error) {
	// query := `
	// SELECT
	// 	user_id as id,
	// 	"name",
	// 	age,
	// 	(SELECT jsonb_agg(row) FROM (SELECT i.image_id as id, i.design, i.preview FROM image i WHERE i.user_id = u.user_id) AS row) as images
	// FROM public.users AS u;
	// `

	// rows, err := c.Query(context.Background(), query)

	// if err != nil {
	// 	return nil, err
	// }

	// defer rows.Close()

	// users := []models.User{}

	// for rows.Next() {
	// 	var user models.User
	// 	if err = rows.Scan(&user.Id, &user.Name, &user.Age); err != nil {
	// 		return nil, err
	// 	}

	// 	users = append(users, user)
	// }

	// return users, nil
	panic("not implemented")
}

func CreateUser(c *pgx.Conn, userGithub *models.UserGithub) (*string, error) {
	query := `
	INSERT INTO public.users (
		name, 
		username, 
		email, 
		avatar) VALUES($1, $2, $3, $4) RETURNING user_id;
		`

	row := c.QueryRow(context.Background(), query, userGithub.Name, userGithub.Login, userGithub.Email, userGithub.AvatarUrl)

	var id *string
	err := row.Scan(id)

	if err != nil {
		return nil, err
	}

	return id, nil
}

// Check user exist
func UserExists(c *pgx.Conn, username *string) (*string, *bool) {
	log.Println("userename ", *username)
	query := "SELECT user_id, admin FROM public.users WHERE username = $1;"
	row := c.QueryRow(context.Background(), query, *username)

	var userId string
	var admin bool
	row.Scan(&userId, &admin)

	return &userId, &admin
}

// Get User Auth By Id
func GetUserAuthById(c *pgx.Conn, id *string) (*models.UserAuthentication, error) {
	query := `
		SELECT 
            u.user_id as id, 
            u.name, 
            u.username, 
            u.email, 
            u.avatar,
            u.admin,
            u.is_premium as isPreimum, 
            u.is_hire_me as isHireMe,
            u.location
        FROM public.users u WHERE u.user_id = $1;
	`
	row := c.QueryRow(context.Background(), query, *id)

	var userAuth models.UserAuthentication
	if err := row.Scan(
		&userAuth.Id,
		&userAuth.Name,
		&userAuth.Username,
		&userAuth.Email,
		&userAuth.Avatar,
		&userAuth.Admin,
		&userAuth.IsPremium,
		&userAuth.IsHireMe,
		&userAuth.Location,
	); err != nil {
		return nil, err
	}

	return &userAuth, nil
}
