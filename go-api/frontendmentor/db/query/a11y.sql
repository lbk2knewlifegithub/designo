-- name: AddA11y :exec
INSERT INTO public.html_validators(report_id,
                                   title,
                                   context,
                                   help,
                                   level)
VALUES ($1, $2, $3, $4, $5);
