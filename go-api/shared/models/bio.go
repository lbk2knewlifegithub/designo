package models

type Bio struct {
	Id              string `db:"bio_id" json:"id"`
	Website         string `db:"website" json:"website"`
	CurrentLearning string `db:"current_learning" json:"currentLearning"`
	Content         string `db:"content" json:"content"`
}
