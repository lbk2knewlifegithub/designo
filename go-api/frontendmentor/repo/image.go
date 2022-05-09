package repo

import (
	"context"
	"fmt"
	"frontendmentor/dto"
	"log"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v4"
)

type image struct{}

var Image *image = &image{}

// Create Images
func (image *image) CreateImages(tx pgx.Tx, challengeID *string, images *[]dto.CreateImageDTO) error {
	columns := 4
	imageLen := len(*images)

	// Query
	var tmp []string
	for index := range *images {
		base := index * columns
		tmp = append(tmp, fmt.Sprintf("($%v, $%v, $%v, $%v)", base+1, base+2, base+3, base+4))
	}
	query := strings.Join([]string{
		"INSERT INTO public.images(challenge_id, preview, design, title) VALUES",
		strings.Join(tmp, ","),
	}, "")

	// Create Params
	var params []interface{} = make([]interface{}, imageLen*columns)
	for index, img := range *images {
		base := index * columns
		params[base] = *challengeID
		params[base+1] = img.Preview
		params[base+2] = img.Design
		params[base+3] = img.Title
	}

	_, err := tx.Exec(context.Background(), query, params...)

	if err != nil {
		log.Println("CreateImages Error ", err)
		return fiber.ErrInternalServerError
	}

	return nil
}
