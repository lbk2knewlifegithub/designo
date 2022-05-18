-- name: CreateTagsUsers :exec
INSERT INTO public."tags_users"
SELECT
    unnest(@tag_ids::uuid[]) AS ta,
    unnest(@user_ids::uuid[]) AS user_id;

-- name: DeleteTagsUsers :exec
DELETE
FROM public.tags_users
WHERE user_id = $1;