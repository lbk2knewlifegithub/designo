package repo

import (
	"context"
	"fmt"
	"log"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v4"
)

type language struct{}

var Language *language = &language{}

// Create Languages
func (language *language) CreateLangauges(tx pgx.Tx, challengeID *string, languages *[]string) error {
	columns := 2
	imageLen := len(*languages)

	// Query
	var tmp []string
	for index := range *languages {
		base := index * columns
		tmp = append(tmp, fmt.Sprintf("($%v, $%v)", base+1, base+2))
	}
	query := strings.Join([]string{
		"INSERT INTO public.languages(challenge_id, name) VALUES",
		strings.Join(tmp, ","),
	}, "")

	// Create Params
	var params []interface{} = make([]interface{}, imageLen*columns)
	for index, lang := range *languages {
		base := index * columns
		params[base] = *challengeID
		params[base+1] = lang
	}

	_, err := tx.Exec(context.Background(), query, params...)

	if err != nil {
		log.Println("CreateLanguages Error ", err)
		return fiber.ErrInternalServerError
	}

	return nil

}
