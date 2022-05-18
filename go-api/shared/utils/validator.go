package utils

import (
	"fmt"

	v10 "github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)

type Validator struct {
	validate *v10.Validate
}

func NewValidator() Validator {
	validate := v10.New()

	// Custom validation for uuid.UUID fields.
	err := validate.RegisterValidation("uuid", func(fl v10.FieldLevel) bool {
		field := fl.Field().String()
		if _, err := uuid.Parse(field); err != nil {
			return false // if there is an error, validation should return false
		}
		return true // if no error, validation should return true
	})
	if err != nil {
		panic(fmt.Sprintln("failed to register uuid validation:", err))
	}

	return Validator{
		validate: validate,
	}
}

func (v *Validator) Validate(s interface{}) *map[string]string {
	if err := v.validate.Struct(s); err != nil {
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
	for _, err := range err.(v10.ValidationErrors) {
		fields[err.Field()] = err.Error()
	}

	return fields
}
