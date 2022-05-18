-- name: UpdateSolutionScreenshot :exec
UPDATE public.solutions s 
SET screenshot = $1 
WHERE s.user_id = $2 AND s.solution_id = $3; 

-- name: GetSolutionScreenshot :one
SELECT s.screenshot 
FROM public.solutions s 
WHERE s.user_id = $1 AND s.solution_id = $2; 