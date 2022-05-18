package service

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"shared"
	"shared/utils"

	"github.com/goccy/go-json"
)

type screenshot struct{}

var Screenshot *screenshot = &screenshot{}

type TakeScreenShotRes struct {
	Screenshot string `json:"screenshot"`
}

// Make call to upload server and take screenshot
// Return uuid.jpeg
func (s *screenshot) TakeScreenShot(token *string, solutionID *string, url *string) (*string, error) {
	screenshotServerURL := fmt.Sprintf("%v/screenshot?url=%v&id=%v", *shared.Config.UploadServerURL, *url, *solutionID)

	client := &http.Client{}

	// Create request
	req, err := http.NewRequest("GET", screenshotServerURL, nil)
	if err != nil {
		log.Println("TakeScreenshot Service create request failure Error: ", err)
		return nil, err
	}

	// Set Header
	req.Header.Set("Authorization", *token)

	// Make request
	res, err := client.Do(req)
	if err != nil {
		log.Println("TakeScreenshot Service  make tequest to upload server Error: ", err)
		return nil, err
	}

	// Read response
	bytes, err := io.ReadAll(res.Body)
	if err != nil {
		log.Println("TakeScreenshot Service read body response Error: ", err)
		return nil, err
	}

	var takeScreenShotRes TakeScreenShotRes
	err = json.Unmarshal(bytes, &takeScreenShotRes)
	if err != nil {
		log.Println("TakeScreenshot Service  Unmarshal screenshot response Error: ", err)
		return nil, err
	}
	log.Println(takeScreenShotRes)
	return &takeScreenShotRes.Screenshot, nil
}

// Make call to upload server to delete screenshot
func (s *screenshot) DeleteScreenshot(name *string) error {
	deleteURL := fmt.Sprintf("%v/screenshot", shared.Config.UploadServerURL)

	// Create request
	req, err := http.NewRequest("GET", deleteURL, nil)
	if err != nil {
		utils.LogD.Println("Create request failure Erro: ", err)
		return err
	}

	// Set Header
	req.Header.Set("Authorization", *shared.Config.MasterKey)

	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		utils.LogD.Println("Make call to screenshot server failure ", err)
		return err
	}

	utils.LogD.Println(res)

	return nil
}
