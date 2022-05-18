package models

type Message struct {
	MessageType string `json:"type,,omitempty"`
	Message     string `json:"message,omitempty"`
	Extract     string `json:"extract,omitempty"`
}

type HtmlValidator struct {
	Messages []Message `json:"messages,omitempty"`
}

func (h *HtmlValidator) ToIssues() *[]Issue {
	var issues []Issue

	for _, m := range h.Messages {
		Level := toLevel(&m.MessageType)
		Title := m.Message
		Context := m.Extract

		if Level == nil || Title == "" || Context == "" {
			continue
		}

		issue := Issue{
			Level:   *Level,
			Title:   Title,
			Context: Context,
			Help:    nil,
		}
		issues = append(issues, issue)
	}

	return &issues
}

func toLevel(messageType *string) *string {
	var result string
	switch *messageType {
	case "error":
		result = "error"
	case "info":
		result = "info"
	default:
		result = "warning"
	}
	return &result
}
