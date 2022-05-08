package models

type UserLinks struct {
	Id            string `json:"id"`
	Github        string `json:"github"`
	Twitter       string `json:"twitter"`
	DevTo         string `json:"dev_to"`
	HashNode      string `json:"hashnode"`
	Codepen       string `json:"codeped"`
	Twitch        string `json:"twitch"`
	StackOverFlow string `json:"stack_over_flow"`
	Gitlab        string `json:"gitlab"`
	FreeCodeCamp  string `json:"free_code_camp"`
	Medium        string `json:"medium"`
	Youtube       string `json:"youtube"`
	Codewars      string `json:"codewars"`
}
