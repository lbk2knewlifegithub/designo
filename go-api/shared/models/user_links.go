package models

type UserLinks struct {
	Github        string `json:"github,omitempty"`
	Twitter       string `json:"twitter,omitempty"`
	DevTo         string `json:"devTo,omitempty"`
	HashNode      string `json:"hashnode,omitempty"`
	Codepen       string `json:"codepen,omitempty"`
	Twitch        string `json:"twitch,omitempty"`
	StackOverFlow string `json:"stackOverFlow,omitempty"`
	Gitlab        string `json:"gitlab,omitempty"`
	FreeCodeCamp  string `json:"freeCodeCamp,omitempty"`
	Medium        string `json:"medium,omitempty"`
	Youtube       string `json:"youtube,omitempty"`
	Codewars      string `json:"codewars,omitempty"`
	LinkedIn      string `json:"linkedIn,omitempty"`
}
