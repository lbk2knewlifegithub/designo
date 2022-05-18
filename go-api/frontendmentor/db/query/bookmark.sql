-- name: AddBookmark :exec
INSERT INTO public."bookmarks"(user_id, solution_id)
VALUES ($1, $2);

-- name: DeleteBookmark :exec
DELETE
FROM public."bookmarks" b
WHERE b.user_id = $1
  AND b.solution_id = $2;