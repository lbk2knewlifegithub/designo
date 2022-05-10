package models

type Bio struct {
	Website         string `db:"website" json:"website,omitempty"`
	CurrentLearning string `db:"current_learning" json:"currentLearning,omitempty"`
	Content         string `db:"content" json:"content,omitempty"`
}
