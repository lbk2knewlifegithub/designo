// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.13.0
// source: user.sql

package db

import (
	"context"
	"database/sql"
	"encoding/json"

	"github.com/google/uuid"
)

const createUser = `-- name: CreateUser :one
INSERT INTO
    public.users (NAME, username, email, avatar_github)
VALUES($1, $2, $3, $4) RETURNING user_id
`

type CreateUserParams struct {
	Name         string `json:"name"`
	Username     string `json:"username"`
	Email        string `json:"email"`
	AvatarGithub string `json:"avatarGithub"`
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (uuid.UUID, error) {
	row := q.db.QueryRowContext(ctx, createUser,
		arg.Name,
		arg.Username,
		arg.Email,
		arg.AvatarGithub,
	)
	var user_id uuid.UUID
	err := row.Scan(&user_id)
	return user_id, err
}

const deleteUser = `-- name: DeleteUser :exec
DELETE
FROM public.users
WHERE user_id = $1
`

func (q *Queries) DeleteUser(ctx context.Context, userID uuid.UUID) error {
	_, err := q.db.ExecContext(ctx, deleteUser, userID)
	return err
}

const getUserByID = `-- name: GetUserByID :one
SELECT
    u.user_id AS id,
    u.name,
    u.username,
    u.email,
    u.avatar,
    u.avatar_github,
    u.admin,
    u.is_premium,
    u.is_hire_me,
    u.LOCATION,
    COALESCE( (
            SELECT SUM(d.points)
            FROM public.users_challenges uc
                JOIN public.challenges c USING (challenge_id)
                JOIN difficulties d
                ON d. "name" = c.difficulty
            WHERE
                uc.user_id = u.user_id
        ),
        0
    ) points, (
        SELECT row_to_json(ROW)
        FROM (
            SELECT
                b.website,
                b.current_learning,
                b.content
            FROM bio b
            WHERE b.user_id = u.user_id
        ) ROW
    ) bio, (
        SELECT row_to_json(ROW)
        FROM (
            SELECT
                es.comment_on_solution AS commentOnSolution,
                es.reply_on_comment AS replyOnComment,
                es.mention_in_comment AS mentionInComment,
                es.earn_an_archivement AS earnAnArchivement
            FROM email_settings es
            WHERE
                es.user_id = u.user_id
        ) ROW
    ) email_settings, (
        SELECT row_to_json(ROW)
        FROM (
            SELECT
                l.oauth,
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
            FROM user_links l
            WHERE l.user_id = u.user_id
        ) ROW
    ) links
FROM public.users u
WHERE u.user_id = $1
`

type GetUserByIDRow struct {
	ID            uuid.UUID       `json:"id"`
	Name          string          `json:"name"`
	Username      string          `json:"username"`
	Email         string          `json:"email"`
	Avatar        sql.NullString  `json:"avatar"`
	AvatarGithub  string          `json:"avatarGithub"`
	Admin         bool            `json:"admin"`
	IsPremium     bool            `json:"isPremium"`
	IsHireMe      bool            `json:"isHireMe"`
	Location      string          `json:"location"`
	Points        interface{}     `json:"points"`
	Bio           json.RawMessage `json:"bio"`
	EmailSettings json.RawMessage `json:"emailSettings"`
	Links         json.RawMessage `json:"links"`
}

func (q *Queries) GetUserByID(ctx context.Context, userID uuid.UUID) (GetUserByIDRow, error) {
	row := q.db.QueryRowContext(ctx, getUserByID, userID)
	var i GetUserByIDRow
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Username,
		&i.Email,
		&i.Avatar,
		&i.AvatarGithub,
		&i.Admin,
		&i.IsPremium,
		&i.IsHireMe,
		&i.Location,
		&i.Points,
		&i.Bio,
		&i.EmailSettings,
		&i.Links,
	)
	return i, err
}

const getUserIDByUsername = `-- name: GetUserIDByUsername :exec
SELECT user_id, admin
FROM public.users
WHERE username = $1
`

type GetUserIDByUsernameRow struct {
	UserID uuid.UUID `json:"userID"`
	Admin  bool      `json:"admin"`
}

func (q *Queries) GetUserIDByUsername(ctx context.Context, username string) error {
	_, err := q.db.ExecContext(ctx, getUserIDByUsername, username)
	return err
}

const updateUser = `-- name: UpdateUser :exec
UPDATE public.users
SET NAME = $1, email = $2, is_hire_me = $3, location = $4
WHERE user_id = $5
`

type UpdateUserParams struct {
	Name     string    `json:"name"`
	Email    string    `json:"email"`
	IsHireMe bool      `json:"isHireMe"`
	Location string    `json:"location"`
	UserID   uuid.UUID `json:"userID"`
}

func (q *Queries) UpdateUser(ctx context.Context, arg UpdateUserParams) error {
	_, err := q.db.ExecContext(ctx, updateUser,
		arg.Name,
		arg.Email,
		arg.IsHireMe,
		arg.Location,
		arg.UserID,
	)
	return err
}