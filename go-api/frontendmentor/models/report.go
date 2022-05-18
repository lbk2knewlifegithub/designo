package models

import "time"

type Issue struct {
	Title   string  `json:"title"`
	Context string  `json:"context"`
	Level   string  `json:"level"`
	Help    *string `json:"help,omitempty"`
}

type Report struct {
	CreatedAt     time.Time `json:"createdAt"`
	A11y          []Issue   `json:"a11y,omitempty"`
	HtmlValidator []Issue   `json:"htmlValidator"`
}
