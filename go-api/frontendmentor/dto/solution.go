package dto

type CreateSolutionDTO struct {
	ChallengeID string    `json:"challengeID" validate:"required,uuid" `
	Title       string    `json:"title" validate:"required,lte=70" `
	RepoURL     string    `json:"repoURL" validate:"required,lte=255"`
	LiveSiteURL string    `json:"liveSiteURL" validate:"required,lte=255"`
	Tags        *[]string `json:"tags" validate:"required,dive,uuid"`
	Questions   string    `json:"questions" validate:"required,lte=500"`
	IsPrivate   bool      `json:"isPrivate"`
}

type UpdateSolutionDTO struct {
	Title       string    `json:"title" validate:"required,lte=70" `
	RepoURL     string    `json:"repoURL" validate:"required,lte=255"`
	LiveSiteURL string    `json:"liveSiteURL" validate:"required,lte=255"`
	Tags        *[]string `json:"tags" validate:"required,dive,uuid"`
	Questions   string    `json:"questions" validate:"required,lte=500"`
	IsPrivate   bool      `json:"isPrivate"`
}
