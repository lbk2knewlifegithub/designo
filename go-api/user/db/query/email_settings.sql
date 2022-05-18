-- name: UpdateEmailSettings :exec
UPDATE public.email_settings
SET
    comment_on_solution = $1,
    reply_on_comment = $2,
    mention_in_comment = $3,
    earn_an_archivement = $4
WHERE user_id = $5;

-- name: CreateDefaultEmailSettings :exec
INSERT INTO public.email_settings (user_id)
VALUES ($1);