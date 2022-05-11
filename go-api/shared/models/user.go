package models

import "time"

type User struct {
	ID            string        `json:"id"`
	Name          string        `json:"name"`
	Username      string        `json:"username"`
	Email         string        `json:"email"`
	Avatar        *string       `json:"avatar"`
	AvatarGithub  string        `json:"avatarGithub"`
	CreatedAt     time.Time     `json:"createdAt,omitempty"`
	UpdatedAt     time.Time     `json:"updatedAt,omitempty"`
	Admin         bool          `json:"admin,omitempty"`
	Points        uint          `json:"points"`
	Blocked       bool          `json:"blocked,omitempty"`
	IsPremium     bool          `json:"isPremium,omitempty"`
	IsHireMe      bool          `json:"isHireMe,omitempty"`
	Location      string        `json:"location"`
	Bio           Bio           `json:"bio,omitempty"`
	EmailSettings EmailSettings `json:"emailSettings"`
	Links         UserLinks     `json:"links,omitempty"`
}

type UserGithub struct {
	Name      string `json:"name"`
	Login     string `json:"login"`
	AvatarUrl string `json:"avatar_url"`
	Email     string `json:"email"`
	HTML_URL  string `json:"html_url"`
}

type UserToken struct {
	ID    string `json:"id"`
	Admin bool   `json:"admin"`
}
