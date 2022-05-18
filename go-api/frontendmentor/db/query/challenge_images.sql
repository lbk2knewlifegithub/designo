-- name: AddChallengeImages :one
INSERT INTO public."images"(challenge_id, preview, design, title)
VALUES ($1, $2, $3, $4);