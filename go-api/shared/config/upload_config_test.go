package config

import (
	"fmt"
	"github.com/google/uuid"
	"github.com/joho/godotenv"
	"github.com/stretchr/testify/require"
	"os"
	"strings"
	"testing"
)

func newUploadConfigTest() UploadConfig {
	return UploadConfig{
		Address:     "0.0.0.0:8081",
		StoragePath: "/tmp/upload",
	}
}

func TestUploadConfig_NewConfigFromEnv_ShouldReturnUploadConfig(t *testing.T) {
	err := godotenv.Load("../../app.env")
	require.NoError(t, err)

	uploadConfig, err := NewUploadConfigFromEnv()
	require.Nil(t, err)
	require.NotNil(t, uploadConfig)
	require.NotEmpty(t, uploadConfig.Address)
	require.NotEmpty(t, uploadConfig.StoragePath)

	// Should create public folder
	_, err = os.Stat(*uploadConfig.publicPath())
	require.NoError(t, err)

	// Should create private folder
	_, err = os.Stat(*uploadConfig.privatePath())
	require.NoError(t, err)
}

func TestUploadConfig_NewConfigFromEnv_ShouldReturnErrorWhenStoragePathEndWithSplash(t *testing.T) {
	uploadConfig, err := NewUploadConfigFromEnv()
	require.Error(t, err)
	require.Nil(t, uploadConfig)
}

func TestUploadConfig_publicPath(t *testing.T) {
	u := newUploadConfigTest()
	require.Equal(t, "/tmp/upload/public", *u.publicPath())
}

func TestUploadConfig_privatePath(t *testing.T) {
	u := newUploadConfigTest()
	require.Equal(t, "/tmp/upload/private", *u.privatePath())
}

func TestUploadConfig_GetPublicPath(t *testing.T) {
	u := newUploadConfigTest()
	randomID := uuid.New().String()
	require.Equal(t, fmt.Sprintf("%v/%v", *u.publicPath(), randomID), *u.GetPublicPath(&randomID))
}

func TestUploadConfig_GetPrivatePath(t *testing.T) {
	u := newUploadConfigTest()
	randomID := uuid.New().String()
	require.Equal(t, fmt.Sprintf("%v/%v", *u.privatePath(), randomID), *u.GetPrivatePath(&randomID))
}

func TestUploadConfig_CreatePublicPath(t *testing.T) {
	u := newUploadConfigTest()
	path := u.CreatePublicPath()

	require.NotEmpty(t, path)
	require.True(t, strings.HasPrefix(*path, *u.publicPath()))

	lastSplash := strings.LastIndex(*path, "/")
	_, err := uuid.Parse((*path)[lastSplash+1:])
	require.NoError(t, err)
}

func TestUploadConfig_CreatePrivatePath(t *testing.T) {
	u := newUploadConfigTest()
	path := u.CreatePrivatePath()

	require.NotEmpty(t, path)
	require.True(t, strings.HasPrefix(*path, *u.privatePath()))

	lastSplash := strings.LastIndex(*path, "/")
	_, err := uuid.Parse((*path)[lastSplash+1:])
	require.NoError(t, err)
}
