package server

import (
	"context"
	"database/sql"
	"go.uber.org/zap"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"shared/token_maker"
	db "upload/db/sqlc"
)

// Upload Avatar
func (s *Server) uploadAvatar(ctx *fiber.Ctx) error {
	// Get Avatar File
	form, err := ctx.MultipartForm()
	if err != nil {
		log.Println(err)
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Image must be [jpeg, png, jpg] and field must be named 'avatar'",
		})
	}

	avatar := form.File["avatar"][0]
	if avatar == nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Image must be [jpeg, png, jpg] and field must be named 'avatar'",
		})
	}

	file, err := avatar.Open()
	if err != nil {
		s.logger.Debug("Open Avatar As file Error:", zap.Error(err))
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}
	user := ctx.Locals("user").(*token_maker.Payload)

	// Get Old Avatar
	oldAvatar, err := s.store.GetUserAvatar(context.Background(), user.ID)
	if err != nil {
		if err != sql.ErrNoRows {

		}

		s.logger.Debug("Get Old Avatar Error:", zap.Error(err))
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Resize avatar and Delete tmp avatar
	newAvatar := s.uploadConfig.CreatePublicItem()
	if err := s.ResizeAndSave(file, s.uploadConfig.Avatar, &newAvatar.AbsolutePath); err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Update User Avatar in database
	err = s.store.UpdateUserAvatar(context.Background(), db.UpdateUserAvatarParams{
		Avatar: sql.NullString{
			String: newAvatar.ID.String(),
			Valid:  true,
		},
		UserID: user.ID,
	})
	if err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	return ctx.Status(fiber.StatusCreated).JSON(fiber.Map{
		"avatar": newAvatar.ID,
	})
}

func (s *Server) UploadFile(data []byte, isPublic bool) error {
	if isPublic {
		return os.WriteFile(*u.PublicPath()+"/", data, 0644)
	}
	return os.WriteFile(*u.PrivatePath()+"/", data, 0644)
}

func (s *Server) RemoveFile(id *string, isPublic bool) error {
	var removePath string
	if isPublic {
		removePath = *s.uploadConfig.PublicPath() + "/" + *id
	} else {
		removePath = *s.uploadConfig.PrivatePath() + "/" + *id
	}
	return os.Remove(removePath)
}
