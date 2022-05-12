package repo

import (
	"context"
	"fmt"
	"frontendmentor/models"
	"log"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v4"
)

type report struct{}

var Report *report = &report{}

// Create Issues
func (r *report) CreateIssues(tx pgx.Tx, solutionID *string, issues *[]models.Issue) error {
	columns := 6
	issuesLen := len(*issues)
	createdAt := time.Now().UTC()

	// Query
	var tmp []string
	for index := range *issues {
		base := index * columns
		tmp = append(tmp, fmt.Sprintf("($%v, $%v, $%v, $%v, $%v, $%v)",
			base+1,
			base+2,
			base+3,
			base+4,
			base+5,
			base+6,
		))
	}
	query := strings.Join([]string{
		`INSERT INTO public.issues(solution_id, 
			type, 
			title, 
			content, 
			help, 
			created_at) VALUES`,
		strings.Join(tmp, ","),
	}, "")

	// Create Params
	var params []interface{} = make([]interface{}, issuesLen*columns)
	for index, issue := range *issues {
		base := index * columns
		params[base] = *solutionID
		params[base+1] = issue.IssueType
		params[base+2] = issue.Title
		params[base+3] = issue.Content
		params[base+3] = issue.Help
		params[base+3] = createdAt
	}

	_, err := tx.Exec(context.Background(), query, params...)

	if err != nil {
		log.Println("CreateIssues Error ", err)
		return fiber.ErrInternalServerError
	}

	return nil
}
