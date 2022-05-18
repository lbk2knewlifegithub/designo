-- name: CreateTag :one
INSERT INTO public.tags("name")
VALUES ($1)
