package models

type EmailSettingsDB struct {
	CommentOnSolution string `db:"comment_on_solution" json:"comment_on_solution,omitempty"`
	ReplyOnComment    string `db:"reply_on_comment" json:"reply_on_comment,omitempty"`
	MentionInComment  string `db:"mention_in_comment" json:"mention_in_comment,omitempty"`
	EarnAnArchivement string `db:"earn_an_archivement" json:"earn_an_archivement,omitempty"`
}
