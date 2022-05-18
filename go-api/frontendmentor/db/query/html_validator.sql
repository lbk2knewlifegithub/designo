-- name: CreateHtmlValidators :exec
INSERT INTO public."html_validators"
SELECT unnest(@report_ids::uuid[])  AS report_id,
       unnest(@titles::varchar[])   AS title,
       unnest(@levels::varchar[])   AS LEVEL,
       unnest(@help::varchar[])     AS help,
       unnest(@contexts::varchar[]) AS "context";
-- name: DeleteTagsSolutions :exec
DELETE
FROM public.tags_solutions
WHERE solution_id = $ 1;
-- name: GetTagsOfSolution :many
SELECT tag_id,
       NAME
FROM public.tags;