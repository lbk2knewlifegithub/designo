package dto

type CreateChallengeDTO struct {
	Steps         string           `json:"steps" validate:"required,lte=800" `
	Ideas         string           `json:"ideas" validate:"required,lte=800"`
	ChallengeType string           `json:"type" validate:"required,lte=50"`
	Languages     []string         `json:"languages" validate:"required"`
	HeroImage     string           `json:"heroImage" validate:"required,lte=200"`
	Title         string           `json:"title" validate:"required,lte=255"`
	Description   string           `json:"description" validate:"required,lte=800"`
	Difficulty    string           `json:"difficulty" validate:"required,lte=50"`
	StarterURL    string           `json:"starterURL" validate:"required,lte=255"`
	Brief         string           `json:"brief" validate:"required,lte=6000"`
	Gallery       []CreateImageDTO `json:"gallery" validate:"required,dive"`
}
