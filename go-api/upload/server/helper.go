package server

import (
	"github.com/anthonynsimon/bild/imgio"
	"github.com/anthonynsimon/bild/transform"
	"go.uber.org/zap"
	"image"
	"io"
	"shared/models"
)

func (s *Server) ResizeAndSave(reader io.Reader, re models.Resize, savePath *string) error {
	img, _, err := image.Decode(reader)
	if err != nil {
		s.logger.Debug("Decode Image Error:", zap.Error(err))
		return err
	}

	// Resize Avatar
	resized := transform.Resize(img, re.Width, re.Height, transform.Linear)

	// Save New Avatar
	if err := imgio.Save(*savePath, resized, imgio.JPEGEncoder(re.Quantity)); err != nil {
		s.logger.Debug("Save Image error:", zap.Error(err))
		return err
	}

	return nil
}
