package dto

type CreateImageDTO struct {
	Title   string `json:"title" validate:"required,lte=255"`
	Preview string `json:"preview" validate:"required,lte=255"`
	Design  string `json:"design" validate:"required,lte=255"`
}
