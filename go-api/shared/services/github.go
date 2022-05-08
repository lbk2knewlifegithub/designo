package services

import (
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"shared/models"
	"shared/utils"

	"github.com/goccy/go-json"
)

var Github github

type github struct {
	clientId     string
	clientSecret string
}

func init() {
	utils.LoadEnv()

	clientId := os.Getenv("GITHUB_OAUTH_CLIENT_ID")
	if clientId == "" {
		panic("GITHUB_OAUTH_CLIENT_ID is not set")
	}

	clientSecret := os.Getenv("GITHUB_OAUTH_CLIENT_SECRET")
	if clientSecret == "" {
		panic("GITHUB_OAUTH_CLIENT_SECRET is not set")
	}

	Github = github{
		clientId,
		clientSecret,
	}
}

type githubTokenResponse struct {
	AccessToken string `json:"access_token"`
	TokenType   string `json:"token_type"`
	Scope       string `json:"scope"`
}

type userEmail struct {
	Email   string `json:"email"`
	Primary bool   `json:"primary"`
}

func (github *github) getAccessToken(code *string) (*string, error) {
	url := fmt.Sprintf("https://github.com/login/oauth/access_token?client_id=%v&client_secret=%v&code=%v", github.clientId, github.clientSecret, *code)

	log.Println("url ", url)
	client := &http.Client{}
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Set("Accept", "application/json")

	res, err := client.Do(req)

	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)

	if err != nil {
		return nil, err
	}

	token := &githubTokenResponse{}

	json.Unmarshal(body, token)
	return &token.AccessToken, nil
}

// Get user Email
func getUserEmail(accessToken *string) (*string, error) {
	url := "https://api.github.com/user/emails"
	client := &http.Client{}
	req, _ := http.NewRequest("GET", url, nil)

	// Set Header
	req.Header.Set("Accept", "application/json")
	req.Header.Set("User-Agent", "Golang")
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %v", *accessToken))

	// Make Request
	res, err := client.Do(req)

	if err != nil {
		return nil, err
	}

	defer res.Body.Close()
	body, err := io.ReadAll(res.Body)

	if err != nil {
		return nil, err
	}

	log.Println("body ", string(body))

	// Pass the body to the json decoder.
	userEmails := []userEmail{}
	json.Unmarshal(body, &userEmails)

	// Find Primary Email
	for _, email := range userEmails {
		if email.Primary {
			return &email.Email, nil
		}
	}
	return nil, errors.New("no primary email found")
}

// Get user
func (github *github) GetUser(code *string) (*models.UserGithub, error) {
	// Get Access Token
	accessToken, err := github.getAccessToken(code)

	if err != nil {
		return nil, err
	}

	url := "https://api.github.com/user"
	client := &http.Client{}
	req, _ := http.NewRequest("GET", url, nil)

	// Set Header
	req.Header.Set("Accept", "application/json")
	req.Header.Set("User-Agent", "Golang")
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %v", *accessToken))

	// Make Request
	res, err := client.Do(req)

	if err != nil {
		return nil, err
	}

	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)

	if err != nil {
		return nil, err
	}

	userGithub := &models.UserGithub{}
	json.Unmarshal(body, userGithub)

	// Check if user has email if not will try fetch email again
	if userGithub.Email == "" {
		email, err := getUserEmail(accessToken)
		if err != nil {
			return nil, err
		}
		userGithub.Email = *email
	}

	// Check if name exist if not will asign default is username
	if userGithub.Name == "" {
		userGithub.Name = userGithub.Login
	}

	return userGithub, nil
}
