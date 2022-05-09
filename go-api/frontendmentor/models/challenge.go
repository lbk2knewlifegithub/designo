package models

import "time"

type Challenge struct {
	ID             string    `json:"id"`
	Steps          string    `json:"steps"`
	Ideas          string    `json:"ideas"`
	ChallengeType  string    `json:"type"`
	Languages      []string  `json:"languages"`
	HeroImage      string    `json:"heroImage"`
	Title          string    `json:"title"`
	CreatedAt      time.Time `json:"createdAt"`
	UpdatedAt      time.Time `json:"updatedAt"`
	Description    string    `json:"description"`
	Difficulty     string    `json:"difficulty"`
	StartedCount   uint32    `json:"startedCount"`
	CompletedCount uint32    `json:"completedCount"`
	StarterURL     string    `json:"staterURL"`
	Brief          string    `json:"brief"`
	Gallery        []Image   `json:"gallery"`
}
