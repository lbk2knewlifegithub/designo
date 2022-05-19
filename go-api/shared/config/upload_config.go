package config

import (
	"fmt"
	"github.com/google/uuid"
	"os"
	"shared/models"
)

type UploadConfig struct {
	Address     string
	StoragePath string
	Avatar      models.Rect
	Screenshot  models.Rect
}

type UploadItem struct {
	ID           uuid.UUID
	AbsolutePath string
}

func NewUploadItem(folderPath *string) *UploadItem {
	id := uuid.New()
	return &UploadItem{
		ID:           id,
		AbsolutePath: fmt.Sprintf("%v/%v", *folderPath, id.String()),
	}
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
	err := os.MkdirAll(*u.PublicPath(), 0777)
	if err != nil {
		return nil, fmt.Errorf("cannot create avatar folder")
	}

	// Create Screenshot folder
	err = os.MkdirAll(*u.PrivatePath(), 0777)
	if err != nil {
		return nil, fmt.Errorf("cannot create private folder")
	}

	return u, nil
}

func (u *UploadConfig) PublicPath() *string {
	result := u.StoragePath + "/public"
	return &result
}

func (u *UploadConfig) PrivatePath() *string {
	result := u.StoragePath + "/private"
	return &result
}

func (u *UploadConfig) CreatePublicItem() *UploadItem {
	return NewUploadItem(u.PublicPath())
}

func (u *UploadConfig) CreatePrivateItem() *UploadItem {
	return NewUploadItem(u.PrivatePath())
}
