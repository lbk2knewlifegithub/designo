package server

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
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

	user := ctx.Locals("user").(*token_maker.Payload)

	// Get Old Avatar
	oldAvatar, err := s.store.GetUserAvatar(context.Background(), user.ID)
	if err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Create new AvatarID
	newAvatar := fmt.Sprintf("%v.jpeg", uuid.New().String())
	tmpPath := fmt.Sprintf("/tmp/%v%v", newAvatar, avatar.Filename)

	// Save file to /tmp
	err = ctx.SaveFile(avatar, tmpPath)
	if err != nil {
		log.Println("Save file Error:", err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Resize avatar and Delete tmp avatar
	if err := s.image.ResizeAvatarAndCleanUp(&tmpPath, &newAvatar, oldAvatar); err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Update User Avatar in database
	err = s.store.UpdateUserAvatar(context.Background(), db.UpdateUserAvatarParams{
		Avatar: sql.NullString{
			String: newAvatar,
			Valid:  true,
		},
		UserID: user.ID,
	})
	if err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	return ctx.Status(fiber.StatusCreated).JSON(fiber.Map{
		"avatar": newAvatar,
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
