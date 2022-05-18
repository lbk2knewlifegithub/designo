package server

import (
	"context"
	"frontendmentor/repo"
	"log"
	sv "shared/services"
	"time"

	"github.com/goccy/go-json"

	"github.com/gofiber/fiber/v2"
)

const allTagsKey = "allTags"

// All Tags
func allTags(ctx *fiber.Ctx) error {
	// Get Cached
	cached := sv.Redis.Read.Get(context.Background(), allTagsKey).Val()
	if cached != "" {
		return ctx.SendString(cached)
	}

	// Connect To Database
	conn, err := sv.Database.Connect()
	if err != nil {
		log.Println(err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Get All Tags
	tags, err := repo.Tag.GetAllTags(conn)
	if err != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	// Cache tag
	json, err := json.Marshal(tags)
	if err != nil {
		log.Println("Marchal tags Err ", err.Error())
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}
	if err := sv.Redis.Write.Set(context.Background(), allTagsKey, json, 10*time.Minute).Err(); err != nil {
		log.Println("Set cache tags Error", err)
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}

	return ctx.Status(fiber.StatusOK).JSON(tags)
}

func TagHandlers(a *fiber.App) {
	// Get All Challenges
	a.Get("/tags", allTags)
}
