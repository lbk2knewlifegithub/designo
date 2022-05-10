package handlers

import (
	"fmt"
	"log"

	"shared/middleware"
	"shared/models"
	sv "shared/services"
	"upload/repo"
	"upload/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

// Upload Avatar
func uploadAvatar(ctx *fiber.Ctx) error {
	// Connect To Database
	_, err := sv.Database.Connect()
	if err != nil {
		log.Println(err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

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

	// Connect To Database
	conn, err := sv.Database.Connect()
	if err != nil {
		log.Println(err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}
	userToken := ctx.Locals("user").(*models.UserToken)

	// Get Old Avatar
	oldAvatar, err := repo.Avatar.GetAvatar(conn, &userToken.ID)
	if err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Create new AvatarID
	newAvatar := fmt.Sprintf("%v.jpeg", uuid.New().String())
	tmpPath := fmt.Sprintf("/tmp/%v%v", newAvatar, avatar.Filename)

	// Save file to /tmp
	ctx.SaveFile(avatar, tmpPath)

	// Resize avatar and Delete tmp avatar
	if err := utils.Image.ResizeAvatarAndCleanUp(&tmpPath, &newAvatar, oldAvatar); err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Update Avatar in database
	err = repo.Avatar.UpdateAvatar(conn, &userToken.ID, &newAvatar)
	if err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	return ctx.Status(fiber.StatusCreated).JSON(fiber.Map{
		"avatar": newAvatar,
	})
}

func UploadHandler(a *fiber.App) {
	// Upload Avatar Route
	a.Put("/avatar", middleware.AuthMiddleware, uploadAvatar)
}
