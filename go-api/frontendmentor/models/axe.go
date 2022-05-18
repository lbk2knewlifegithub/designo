package models

type node struct {
	Html string `json:"html"`
}

type violation struct {
	Impact  string `json:"impact"`
	Help    string `json:"help"`
	HelpURL string `json:"helpUrl"`
	Nodes   []node `json:"nodes,omitempty"`
}

func (v *violation) ToIssues() *[]Issue {
	var issues []Issue

	for _, node := range v.Nodes {

		Level := impactToLevel(&v.Impact)
		Title := v.Help
		Context := node.Html
		Help := &v.HelpURL

		if Level == nil || Title == "" || Context == "" || Help == nil {
			continue
		}

		issue := Issue{
			Title:   Title,
			Level:   *Level,
			Context: Context,
			Help:    Help,
		}

		issues = append(issues, issue)
	}
	return &issues
}

type Axe struct {
	Violations []violation `json:"violations,omitempty"`
}

func (a *Axe) ToIssues() *[]Issue {
	var issues []Issue

	for _, v := range a.Violations {
		if len(v.Nodes) == 0 {
			continue
		}

		issues = append(issues, *v.ToIssues()...)
	}

	return &issues
}

func impactToLevel(impact *string) *string {
	var result string
	switch *impact {
	case "serious":
		result = "error"
	case "critical", "moderate":
		result = "warning"
	default:
		result = "info"
	}

	return &result
}
