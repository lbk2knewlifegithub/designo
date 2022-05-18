package service

import (
	"errors"
	"frontendmentor/models"
	"log"
	"os/exec"

	"github.com/goccy/go-json"
)

// A11y Generate A11y
func A11y(url *string) (*[]models.Issue, error) {
	cmd := exec.Command("axe", *url, "-j")

	output, err := cmd.CombinedOutput()
	if len(output) == 0 {
		log.Println("Axe Error: ", err)
		return nil, err
	}

	var axes []models.Axe
	err = json.Unmarshal(output, &axes)
	if err != nil {
		log.Println("Unmarshal Axe Error: ", err)
		return nil, errors.New("unmarshal Axe Error")
	}

	if len(axes) != 1 {
		return nil, errors.New("axes must have only one element")
	}

	return axes[0].ToIssues(), nil
}

// HtmlValidator Generate HtmlValidator
func HtmlValidator(url *string) (*[]models.Issue, error) {
	cmd := exec.Command("html-validator", *url, "--format=json", "--verbose")

	output, err := cmd.CombinedOutput()
	if len(output) == 0 {
		log.Println("HtmlValidator Error: ", err)
		return nil, err
	}

	// Generate HtmlValidator Report
	var htmlValidator models.HtmlValidator
	err = json.Unmarshal(output, &htmlValidator)
	if err != nil {
		log.Println("Unmarshal HtmlValidator Error: ", err)
		return nil, errors.New("unmarshal HtmlValidator Error")
	}

	return htmlValidator.ToIssues(), nil
}
