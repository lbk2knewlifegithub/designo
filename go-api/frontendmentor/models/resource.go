package models

type Resource struct {
	ID           string `json:"id,omitempty"`
	Description  string `json:"description,omitempty"`
	Title        string `json:"title"`
	Link         string `json:"link"`
	Image        string `json:"image"`
	ResourceType string `json:"type"`
}
