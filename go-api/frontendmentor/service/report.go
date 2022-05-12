package service

import "frontendmentor/models"

type report struct{}

var Report *report = &report{}

func (r *report) GenerateReport(URL string) (*[]models.Issue, error) {
	panic("implement me")
}
