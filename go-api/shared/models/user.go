package models

import "time"

type UserProfile struct {
	Id        string    `json:"id"`
	Name      string    `json:"name"`
	Username  int       `json:"username"`
	Email     int       `json:"email"`
	Avatar    int       `json:"avatar"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Admin     bool      `json:"admin"`
	Blocked   bool      `json:"blocked"`
	IsPremium bool      `json:"is_premium"`
	IsHireMe  bool      `json:"is_hire_me"`
	Location  string    `json:"location"`
	Bio       Bio       `json:"bio"`
	Links     UserLinks `json:"links"`
}

type UserAuthentication struct {
	Id        string    `json:"id"`
	Name      string    `json:"name"`
	Username  string    `json:"username"`
	Email     string    `json:"email"`
	Avatar    string    `json:"avatar"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
	Admin     bool      `json:"admin"`
	Blocked   bool      `json:"blocked"`
	IsPremium bool      `json:"isPremium"`
	IsHireMe  bool      `json:"isHireMe"`
	Location  string    `json:"location"`
}

type UserGithub struct {
	Name      string `json:"name"`
	Login     string `json:"login"`
	AvatarUrl string `json:"avatar_url"`
	Email     string `json:"email"`
}

type UserToken struct {
	Id    string `json:"id"`
	Admin bool   `json:"admin"`
}
