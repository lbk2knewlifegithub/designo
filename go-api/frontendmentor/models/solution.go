package models

import (
	"shared/models"
	"time"
)

type SolutionReport struct {
	A11y          uint `json:"a11y"`
	HtmlValidator uint `json:"utmlValidator"`
}
type Solution struct {
	ID             string          `json:"id"`
	ChallengeID    string          `json:"challengeID"`
	Difficulty     string          `json:"difficulty"`
	Title          string          `json:"title"`
	RepoURL        string          `json:"repoURL"`
	LiveSiteURL    string          `json:"liveSiteURL"`
	Screenshot     string          `json:"screenshot"`
	Tags           []string        `json:"tags,omitempty"`
	Questions      string          `json:"questions"`
	CreatedAt      time.Time       `json:"createdAt"`
	UpdatedAt      time.Time       `json:"updatedAt"`
	Likes          uint            `json:"likes"`
	Comments       uint            `json:"comments"`
	Bookmarks      uint            `json:"bookmarks"`
	IsPrivate      bool            `json:"isPrivate"`
	IsBookmarked   bool            `json:"isBookmarked"`
	IsLiked        bool            `json:"isLiked"`
	IsCommented    bool            `json:"isCommented"`
	Languages      []string        `json:"languages"`
	User           models.UserMini `json:"user"`
	SolutionReport SolutionReport  `json:"report"`
}
