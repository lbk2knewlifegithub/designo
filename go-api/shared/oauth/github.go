package oauth

import (
	"errors"
	"fmt"
	"github.com/goccy/go-json"
	"io"
	"log"
	"net/http"
	"os"
)

const (
	githubUserInfoURL   = "https://api.github.com/user"
	githubUserEmailsURL = "https://api.github.com/user/emails"
)

type Github struct {
	GithubID     string
	GithubSecret string
}

func (g *Github) createURLGetAccessToken(code *string) *string {
	result := fmt.Sprintf(
		"https://github.com/login/oauth/access_token?client_id=%v&client_secret=%v&code=%v",
		g.GithubID,
		g.GithubSecret,
		*code)
	return &result
}

func NewGithubFromEnv() (g Github) {
	var ok bool
	g.GithubID, ok = os.LookupEnv("GITHUB_ID")
	if !ok {
		log.Fatal("GITHUB_ID is not set")
	}
	g.GithubSecret, ok = os.LookupEnv("GITHUB_SECRET")
	if !ok {
		log.Fatal("GITHUB_SECRET is not set")
	}
	return
}

func (g *Github) getAccessToken(code *string) (*string, error) {
	url := g.createURLGetAccessToken(code)

	client := &http.Client{}
	req, _ := http.NewRequest("GET", *url, nil)
	req.Header.Set("Accept", "application/json")

	res, err := client.Do(req)

	if err != nil {
		return nil, err
	}
	defer func(Body io.ReadCloser) {
		_ = Body.Close()
	}(res.Body)

	body, err := io.ReadAll(res.Body)

	if err != nil {
		return nil, err
	}

	token := &githubTokenResponse{}

	err = json.Unmarshal(body, token)
	if err != nil {
		log.Println("error unmarshal when get access_token", err)
		return nil, err
	}
	return &token.AccessToken, nil
}

// Get user Email
func getUserEmail(accessToken *string) (*string, error) {
	client := &http.Client{}
	req, _ := http.NewRequest("GET", githubUserEmailsURL, nil)

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

	// Pass the body to the json decoder.
	var userEmails []userEmail
	err = json.Unmarshal(body, &userEmails)
	if err != nil {
		log.Println("error unmarshal when get user email", err)
		return nil, err
	}

	// Find Primary Email
	for _, email := range userEmails {
		if email.Primary {
			return &email.Email, nil
		}
	}
	return nil, errors.New("no primary email found")
}

// GetUser Get user
func (g *Github) GetUser(code *string) (*UserGithub, error) {
	// Get Access Token
	accessToken, err := g.getAccessToken(code)

	if err != nil {
		return nil, err
	}

	client := &http.Client{}
	req, _ := http.NewRequest("GET", githubUserInfoURL, nil)

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

	userGithub := &UserGithub{}
	err = json.Unmarshal(body, userGithub)
	if err != nil {
		log.Println("error unmarshal when get user", err)
		return nil, err
	}

	// Check if user has email if not will try fetch email again
	if userGithub.Email == "" {
		email, err := getUserEmail(accessToken)
		if err != nil {
			return nil, err
		}
		userGithub.Email = *email
	}
	// Check if name exist is not will assign default is username
	if userGithub.Name == "" {
		userGithub.Name = userGithub.Login
	}

	return userGithub, nil
}

func (g *Github) UploadAvatar() string {
	return "github"
}

func (g *Github) ResizeAvatar() string {
	return "github"
}
