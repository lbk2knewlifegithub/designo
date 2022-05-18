-- name: CreateUserBio :exec
INSERT INTO
    public.bio (website, content, current_learning, user_id)
VALUES($1, $2, $3, $4);

-- name: UpdateUserBio :exec
UPDATE public.bio
SET website = $1, current_learning = $2, content = $3
WHERE user_id = $4;

-- name: DeleteUserBio :exec
DELETE
FROM public.bio
WHERE user_id = $1;