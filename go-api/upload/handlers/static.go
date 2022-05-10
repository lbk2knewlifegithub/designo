package handlers

import (
	"upload/utils"

	"github.com/gofiber/fiber/v2"
)

func StaticHandlers(a *fiber.App) {
	a.Static("/static/public", utils.Image.PublicPath)
	a.Static("/static/private", utils.Image.PrivatePath)
}
