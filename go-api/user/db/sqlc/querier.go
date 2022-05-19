// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.13.0

package db

import (
	"context"

	"github.com/google/uuid"
)

type Querier interface {
	CreateDefaultEmailSettings(ctx context.Context, userID uuid.UUID) error
	CreateUser(ctx context.Context, arg CreateUserParams) (uuid.UUID, error)
	CreateUserBio(ctx context.Context, arg CreateUserBioParams) error
	CreateUserLinks(ctx context.Context, arg CreateUserLinksParams) error
	DeleteUser(ctx context.Context, userID uuid.UUID) error
	DeleteUserBio(ctx context.Context, userID uuid.UUID) error
	DeleteUserLinks(ctx context.Context, userID uuid.UUID) error
	GetUserByID(ctx context.Context, userID uuid.UUID) (GetUserByIDRow, error)
	GetUserIDByUsername(ctx context.Context, username string) error
	UpdateEmailSettings(ctx context.Context, arg UpdateEmailSettingsParams) error
	UpdateUser(ctx context.Context, arg UpdateUserParams) error
	UpdateUserBio(ctx context.Context, arg UpdateUserBioParams) error
	UpdateUserLinks(ctx context.Context, arg UpdateUserLinksParams) error
}

var _ Querier = (*Queries)(nil)