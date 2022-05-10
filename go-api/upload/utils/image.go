package utils

import (
	"fmt"
	"log"
	"os"
	"shared/utils"

	"github.com/anthonynsimon/bild/imgio"
	"github.com/anthonynsimon/bild/transform"
)

const (
	// Avatar Size
	width   = 300
	height  = 300
	quality = 70
)

var Image *image

type image struct {
	PublicPath  string
	PrivatePath string
}

func init() {
	utils.LoadEnv()
	uploadPath := os.Getenv("UPLOAD_PATH")
	if uploadPath == "" {
		panic("UPLOAD_PATH is not set")
	}

	if char := uploadPath[len(uploadPath)-1:]; char == "/" {
		panic("UPLOAD_PATH must not end with a slash")
	}

	Image = &image{
		PublicPath:  fmt.Sprintf("%v/public", uploadPath),
		PrivatePath: fmt.Sprintf("%v/private", uploadPath),
	}

	// Create update directory
	if err := os.MkdirAll(Image.PublicPath, 0777); err != nil {
		panic(fmt.Sprintf("Error creating %v directory: %v", Image.PublicPath, err))
	}

	// Create private directory
	if err := os.MkdirAll(Image.PrivatePath, 0777); err != nil {
		panic(fmt.Sprintf("Error creating %v directory: %v", Image.PrivatePath, err))
	}
}

// Resize avatar and delete after resize is done
func (i *image) ResizeAvatarAndCleanUp(filePath *string, newAvatar *string, oldAvatar *string) error {
	img, err := imgio.Open(*filePath)
	if err != nil {
		fmt.Printf("Error opening tmp image with path=%v, Error=%v", filePath, err)
		return err
	}

	// Resize Avatar
	resized := transform.Resize(img, width, height, transform.Linear)

	output := fmt.Sprintf("%v/%s", i.PublicPath, *newAvatar)

	// Save New Avatar
	if err := imgio.Save(output, resized, imgio.JPEGEncoder(quality)); err != nil {
		fmt.Println("Resize Image Error: ", err)
		return err
	}

	// Delete Tmp file
	if err := os.Remove(*filePath); err != nil {
		log.Printf("Error deleting tmp file with path=%v, Error:%v", filePath, err)
		return err
	}

	// Delete old Avatar if exist
	if oldAvatar != nil {
		oldAvatarPath := fmt.Sprintf("%v/%s", i.PublicPath, *oldAvatar)
		os.Remove(oldAvatarPath)
	}

	return nil
}

// Delete Avatar
func (i *image) DeleteAvatar(avatar *string) error {
	avatarPath := fmt.Sprintf("%v/%s", i.PublicPath, *avatar)
	if err := os.Remove(avatarPath); err != nil {
		log.Printf("DeleteAvatar Upload path=%v, Error:%v", avatarPath, err)
		return err
	}
	return nil
}
