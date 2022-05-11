package dto

import (
	"shared/models"
)

type UpdateProfileDTO struct {
	Name     string           `json:"name" validate:"required"`
	Email    string           `json:"email" validate:"required,email"`
	IsHireMe bool             `json:"isHireMe"`
	Location string           `json:"location" validate:"required,lte=50"`
	Bio      models.Bio       `json:"bio"`
	Links    models.UserLinks `json:"links"`
}
