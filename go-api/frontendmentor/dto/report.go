package dto

type CreateReportDTO struct {
	ReportID string `json:"reportID" validate:"required,uuid"`
	URL      string `json:"url" validate:"required,url"`
}
