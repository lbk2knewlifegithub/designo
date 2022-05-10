package repo

import (
	"context"
	"log"

	"auth/dto"
	"shared/models"

	"github.com/jackc/pgx/v4"
)

var User *user = &user{}

type user struct{}

const (
// Create User Query
)

func (u *user) GetUsers(c *pgx.Conn) ([]models.User, error) {
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

// Create User
func (u *user) CreateUser(tx pgx.Tx, userGithub *models.UserGithub) (*string, error) {
	query := `
	INSERT INTO public.users (
		name, 
		username, 
		email, 
		avatar_github
		) VALUES($1, $2, $3, $4) RETURNING user_id;`

	row := tx.QueryRow(context.Background(), query,
		// Params
		userGithub.Name,
		userGithub.Login,
		userGithub.Email,
		userGithub.AvatarUrl)

	var userID string
	err := row.Scan(&userID)
	if err != nil {
		log.Println("Create User Errr: ", err)
		return nil, err
	}

	return &userID, nil
}

// Check user exist
func (u *user) UserExists(tx pgx.Tx, username *string) (*string, *bool) {
	query := "SELECT user_id, admin FROM public.users WHERE username = $1;"
	row := tx.QueryRow(context.Background(), query, *username)

	var userId string
	var admin bool
	row.Scan(&userId, &admin)
	return &userId, &admin
}

// Get User By ID
func (u *user) GetUserById(c *pgx.Conn, id *string) (*models.User, error) {
	query := `
		SELECT 
                u.user_id as id, 
                u.name, 
                u.username, 
                u.email, 
                u.avatar,
                u.avatar_github,
                u.admin,
                u.is_premium, 
                u.is_hire_me, 
                u.LOCATION,
          
                COALESCE((SELECT SUM(d.points) 
                FROM public.users_challenges uc 
                JOIN public.challenges c USING(challenge_id) 
                JOIN difficulties d ON d."name" = c.difficulty
                WHERE uc.user_id = u.user_id ), 0) as points,

                (SELECT row_to_json(row) FROM (SELECT
                        b.website,
                        b.current_learning,
                        b.content 
                    FROM bio b WHERE b.user_id = u.user_id) AS row) AS bio,
                    
                (SELECT row_to_json(row) FROM (SELECT 
                        l.github, 
                        l.twitter, 
                        l.dev_to, 
                        l.hashnode, 
                        l.codepen, 
                        l.twitch, 
                        l.stack_over_flow,
                        l.gitlab, 
                        l.free_code_camp, 
                        l.medium, 
                        l.youtube, 
                        l.codewars 
                    FROM user_links l WHERE l.user_id = u.user_id) AS row) AS links
            FROM public.users u WHERE u.user_id::uuid = $1;
		;
	`
	row := c.QueryRow(context.Background(), query, *id)

	var user models.User
	if err := row.Scan(
		&user.ID,
		&user.Name,
		&user.Username,
		&user.Email,
		&user.Avatar,
		&user.AvatarGithub,
		&user.Admin,
		&user.IsPremium,
		&user.IsHireMe,
		&user.Location,
		&user.Points,
		&user.Bio,
		&user.Links,
	); err != nil {
		log.Println("GetUserAuthById Scan Error: ", err)
		return nil, err
	}

	return &user, nil
}

// Update User
func (u *user) UpdateUser(tx pgx.Tx, userID *string, udpateProfileDTO *dto.UpdateProfileDTO) error {
	query := `
		UPDATE public.users
		SET
			name = $1,
			email = $2,
			is_hire_me = $3,
			location = $4
		WHERE user_id = $5;
	 `

	_, err := tx.Exec(context.Background(), query,
		// Params
		udpateProfileDTO.Name,
		udpateProfileDTO.Email,
		udpateProfileDTO.IsHireMe,
		udpateProfileDTO.Location,
		userID,
	)

	if err != nil {
		log.Println("UpdateUser Repo Error: ", err)
		return err
	}

	return nil
}

// Delete User
func (u *user) DeleteUser(tx pgx.Tx, userID *string) error {
	query := `
	DELETE FROM public.users WHERE user_id = $1;
	`

	_, err := tx.Exec(context.Background(), query,
		userID,
	)

	if err != nil {
		log.Println("DeleteUser Repo Error: ", err)
		return err
	}
	return nil
}
