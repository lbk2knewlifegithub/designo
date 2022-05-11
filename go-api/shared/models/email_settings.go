package models

type EmailSettings struct {
	CommentOnSolution bool ` validator:"boolean" json:"commentOnSolution,omitempty"`
	ReplyOnComment    bool `validator:"boolean" json:"replyOnComment,omitempty"`
	MentionInComment  bool `validator:"boolean" json:"mentionInComment,omitempty"`
	EarnAnArchivement bool `validator:"boolean" json:"earnAnArchivement,omitempty"`
}
