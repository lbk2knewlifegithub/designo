package config

import (
	"fmt"
	"github.com/google/uuid"
	"os"
)

type UploadConfig struct {
	Address     string
	StoragePath string
}

func NewUploadConfigFromEnv() (*UploadConfig, error) {
	var ok bool
	u := &UploadConfig{}
	u.Address, ok = os.LookupEnv("UPLOAD_SERVER_ADDRESS")
	if !ok {
		return nil, fmt.Errorf("UPLOAD_SERVER_ADDRESS is not set")
	}

	u.StoragePath, ok = os.LookupEnv("UPLOAD_STORAGE_PATH")
	if !ok {
		return nil, fmt.Errorf("UPLOAD_STORAGE_PATH is not set")
	}

	// Create Screenshot folder
	err := os.MkdirAll(*u.publicPath(), 0777)
	if err != nil {
		return nil, fmt.Errorf("cannot create avatar folder")
	}

	// Create Screenshot folder
	err = os.MkdirAll(*u.privatePath(), 0777)
	if err != nil {
		return nil, fmt.Errorf("cannot create private folder")
	}

	return u, nil
}

func (u *UploadConfig) publicPath() *string {
	result := u.StoragePath + "/public"
	return &result
}

func (u *UploadConfig) privatePath() *string {
	result := u.StoragePath + "/private"
	return &result
}

func (u *UploadConfig) CreatePublicPath() *string {
	result := fmt.Sprintf("%v/%v", *u.publicPath(), uuid.New().String())
	return &result
}

func (u *UploadConfig) CreatePrivatePath() *string {
	result := fmt.Sprintf("%v/%v", *u.privatePath(), uuid.New().String())
	return &result
}

func (u *UploadConfig) GetPublicPath(id *string) *string {
	result := fmt.Sprintf("%v/%v", *u.publicPath(), *id)
	return &result
}

func (u *UploadConfig) GetPrivatePath(id *string) *string {
	result := fmt.Sprintf("%v/%v", *u.privatePath(), *id)
	return &result
}
