package upload

import (
	"github.com/joho/godotenv"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestMyUpload_NewMyUploadFromEnv(t *testing.T) {
	err := godotenv.Load("../../app.env")
	require.Nil(t, err)
	defer func() {
		r := recover()
		require.Nil(t, r)
	}()

	myUpload := NewUploadFromEnv()
	require.NotEmpty(t, myUpload.Address)
	require.NotEmpty(t, myUpload.StoragePath)
}

func TestMyUpload_UploadFile_ShouldUploadFileCorrectly(t *testing.T) {

}

func TestMyUpload_RemoveFile_ShouldReturnErrorWhenFileNotFound(t *testing.T) {
}
