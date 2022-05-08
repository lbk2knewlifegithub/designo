package models

type IssueLevel string

const (
	Info    IssueLevel = "info"
	Warning            = "warning"
	Error              = "error"
)

type IssueType struct {
}

const (
	A11y          = "a11y"
	HtmlValidator = "HtmlValidator"
)

type Issue struct {
	Id        string `db:"issue_id" json:"id"`
	IssueType string `db:"type" json:"type"`
	Level     string `db:"level" json:"level"`
	Title     string `db:"title" json:"title"`
	Context   string `db:"context" json:"context"`
	Help      string `db:"help" json:"help"`
	CreatedAt string `db:"created_at" json:"created_at"`
}

type Report struct {
	Id            string `db:"report_id" json:"id"`
	A11y          string `db:"a11y" json:"a11y"`
	HtmlValidator string `db:"html_valiator" json:"html_valiator"`
}

type CreateIssue struct {
	IssueType string
	Level     string
	Litle     string
	Context   string
	Help      string
}
