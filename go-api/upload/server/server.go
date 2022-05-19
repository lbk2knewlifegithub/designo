package server

import (
	"github.com/goccy/go-json"
	"github.com/gofiber/fiber/v2"
	"go.uber.org/zap"
	"log"
	cache "shared/cache"
	config "shared/config"
	middleware "shared/middleware"
	token "shared/token_maker"
	utils "shared/utils"
	db "upload/db/sqlc"
)

// Server serves HTTP requests for our banking service.
type Server struct {
	tokenMaker   token.TokenMaker
	router       *fiber.App
	store        db.Store
	cache        cache.Cache
	uploadConfig config.UploadConfig
	validator    utils.Validator
	logger       *zap.Logger
}

// NewServer creates a new HTTP server and set up routing.
func NewServer(
	uploadConfig config.UploadConfig,
	tokenMaker token.TokenMaker,
	store db.Store,
	cache cache.Cache,
) (server *Server) {
	logger, err := zap.NewDevelopment()
	if err != nil {
		log.Fatal("Init Zap Error: ", err)
	}
	server = &Server{
		tokenMaker: tokenMaker,
		validator:  utils.NewValidator(),
		store:      store,
		cache:      cache,
		logger:     logger,
	}

	server.setupRouter()
	return
}

func (s *Server) setupRouter() {
	router := fiber.New(
		fiber.Config{
			BodyLimit:   1024 * 1024 * 4,
			JSONEncoder: json.Marshal,
			JSONDecoder: json.Unmarshal,
		},
	)
	// Register Handler
	static := router.Group("/static")
	static.Static("/public", *s.uploadConfig.PublicPath())
	static.Static("/private", *s.uploadConfig.PrivatePath())

	// Screenshot route
	router.Post("/screenshot", middleware.AuthMiddleware(s.tokenMaker), s.takeScreenshot)
	// Upload Avatar Route
	router.Put("/avatar", middleware.AuthMiddleware(s.tokenMaker), s.uploadAvatar)
	s.router = router
}

// Start runs the HTTP server on a specific address.
func (s *Server) Start() {
	log.Fatal(s.router.Listen(s.uploadConfig.Address))
}
