package models

import "time"

type Issue struct {
	ID        string  `json:"id"`
	ReportID  string  `json:"reportID"`
	IssueType string  `json:"type"`
	Title     string  `json:"title"`
	Content   string  `json:"content"`
	Help      *string `json:"help"`
}

type Report struct {
	ID            string    `json:"id"`
	A11y          string    `json:"a11y"`
	HtmlValidator string    `json:"htmlValidator"`
	CreatedAt     time.Time `json:"createdAt"`
}
