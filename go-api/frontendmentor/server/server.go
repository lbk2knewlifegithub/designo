package server

import (
	"github.com/gofiber/fiber/v2"
	"shared/config"
	"shared/token_maker"
	"shared/utils"
	db "upload/db/sqlc"
)

type Server struct {
	config     config.Config
	tokenMaker token_maker.TokenMaker
	router     *fiber.App
	validator  utils.Validator
	store      db.Store
}
