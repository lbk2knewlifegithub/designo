-- name: UpdateUserAvatar :exec
UPDATE public.users 
SET avatar = $1 
WHERE user_id = $2;

-- name: GetUserAvatar :one
SELECT u.avatar 
FROM public.users u 
WHERE u.user_id = $1;