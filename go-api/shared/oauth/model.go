package oauth

type githubTokenResponse struct {
	AccessToken string `json:"access_token"`
	TokenType   string `json:"token_type"`
	Scope       string `json:"scope"`
}

type userEmail struct {
	Email   string `json:"email"`
	Primary bool   `json:"primary"`
}

type UserGithub struct {
	Name      string `json:"name"`
	Login     string `json:"login"`
	AvatarURL string `json:"avatar_url"`
	Email     string `json:"email"`
	HTML_URL  string `json:"html_url"`
}
