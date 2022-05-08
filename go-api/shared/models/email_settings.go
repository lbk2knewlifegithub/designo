package models

type EmailSettingsDB struct {
	Id                string `db:"email_settings_id" json:"email_settings_id"`
	CommentOnSolution string `db:"comment_on_solution" json:"comment_on_solution"`
	ReplyOnComment    string `db:"reply_on_comment" json:"reply_on_comment"`
	MentionInComment  string `db:"mention_in_comment" json:"mention_in_comment"`
	EarnAnArchivement string `db:"earn_an_archivement" json:"earn_an_archivement"`
}
