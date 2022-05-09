package models

type Image struct {
	ID          string `json:"id,omitempty"`
	ChallengeID string `json:"challengeID,omitempty"`
	Title       string `json:"title"`
	Preview     string `json:"preview"`
	Design      string `json:"design"`
}
