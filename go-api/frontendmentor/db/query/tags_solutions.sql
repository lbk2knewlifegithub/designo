-- name: CreateTagsSolutions :exec
INSERT INTO public."tags_solutions"
SELECT
    unnest(@tag_ids::uuid[]) AS tag_id,
    unnest(@solution_ids::uuid[]) AS solution_id;

-- name: DeleteTagsSolutions :exec
DELETE
FROM public.tags_solutions
WHERE solution_id = $1;

-- name: GetTagsOfSolution :many
SELECT tag_id, NAME
FROM public.tags;