package models

import (
	"shared/models"
	"time"
)

type Solution struct {
	ID           string          `json:"id"`
	Title        string          `json:"title"`
	RepoURL      string          `json:"repoURL"`
	LiveSiteURL  string          `json:"liveSiteURL"`
	Screenshot   string          `json:"screentshot"`
	Tags         []string        `json:"tags"`
	Questions    string          `json:"questions"`
	CreatedAt    time.Time       `json:"createdAt"`
	Likes        uint            `json:"likes"`
	Comments     uint            `json:"comments"`
	Bookmarks    uint            `json:"bookmarks"`
	IsPrivate    bool            `json:"isPrivate"`
	IsBookmarked bool            `json:"isBookmarked"`
	IsLiked      bool            `json:"isLiked"`
	IsCommented  bool            `json:"isCommented"`
	User         models.UserMini `json:"user"`
}
