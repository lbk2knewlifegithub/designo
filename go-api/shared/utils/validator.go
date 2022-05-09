package utils

import (
	"log"

	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)

var validate = validator.New()

func init() {
	// Custom validation for uuid.UUID fields.
	_ = validate.RegisterValidation("uuid", func(fl validator.FieldLevel) bool {
		field := fl.Field().String()
		if _, err := uuid.Parse(field); err != nil {
			return false // if there is an error, validation should return false
		}
		return true // if no error, validation should return true
	})
}

func Validate(s interface{}) *map[string]string {
	if err := validate.Struct(s); err != nil {
		log.Println(err)
		msg := validatorErrors(err)
		return &msg
	}
	return nil
}

// ValidatorErrors func for show validation errors for each invalid fields.
func validatorErrors(err error) map[string]string {
	// Define fields map.
	fields := map[string]string{}

	// Make error message for each invalid field.
	for _, err := range err.(validator.ValidationErrors) {
		fields[err.Field()] = err.Error()
	}

	return fields
}
