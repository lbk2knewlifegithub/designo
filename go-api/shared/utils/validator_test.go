package utils

import (
	"testing"

	"github.com/google/uuid"
	"github.com/stretchr/testify/require"
)

func TestShouldResultEmpty(t *testing.T) {

	validate := NewValidator()

	myStruct := struct {
		id string `validate:"uuid"`
	}{
		id: uuid.New().String(),
	}

	result := validate.Validate(myStruct)
	require.Nil(t, result)
}

func TestShouldReturnErrorWhenUUIDInvalid(t *testing.T) {
	validate := NewValidator()

	myStruct := struct {
		id string `validate:"uuid"`
	}{
		id: "something invalid",
	}

	result := validate.Validate(myStruct)
	require.NotNil(t, result)
}
