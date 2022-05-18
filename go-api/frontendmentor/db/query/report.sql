-- name: GetReports :one
SELECT re.created_at AS                               createdAt,
       (SELECT jsonb_agg(ROW)
        FROM (SELECT a.level,
                     a.title,
                     a.context,
                     a.help
              FROM a11y a
              WHERE a.report_id = re.report_id) ROW)  a11y,
       (SELECT jsonb_agg(ROW)
        FROM (SELECT hv.level,
                     hv.title,
                     hv.context,
                     hv.help
              FROM html_validators hv
              WHERE hv.report_id = re.report_id) ROW) htmlValidator
FROM public.reports re
WHERE re.solution_id = $1;

-- name: CreateReport :one
INSERT INTO public.reports(solution_id)
VALUES ($1)
RETURNING report_id;