package upload

import (
	"database/sql"
	"fmt"
	"github.com/anthonynsimon/bild/imgio"
	"github.com/anthonynsimon/bild/transform"
	"log"
	"os"
)

const (
	// Avatar Size
	width   = 300
	height  = 300
	quality = 70
)

// ResizeAvatarAndCleanUp Resize avatar and delete after resize is done
func (i *Image) ResizeAvatarAndCleanUp(tmpPath *string, newAvatarPath *string, oldAvatarPath sql.NullString) error {
	img, err := imgio.Open(*tmpPath)
	if err != nil {
		fmt.Printf("Error opening tmp image with path=%v, Error=%v", tmpPath, err)
		return err
	}

	// Resize Avatar
	resized := transform.Resize(img, width, height, transform.Linear)

	// Save New Avatar
	if err := imgio.Save(*newAvatarPath, resized, imgio.JPEGEncoder(quality)); err != nil {
		fmt.Println("Resize Image Error: ", err)
		return err
	}

	// Delete Tmp file
	if err := os.Remove(*tmpPath); err != nil {
		log.Printf("Error deleting tmp file with path=%v, Error:%v", tmpPath, err)
		return err
	}

	// Delete old Avatar if exist
	if oldAvatarPath.Valid {
		_ = os.Remove(oldAvatarPath.String)
	}
	return nil
}
