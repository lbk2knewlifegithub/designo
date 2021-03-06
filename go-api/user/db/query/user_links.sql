-- name: CreateUserLinks :exec
INSERT INTO
    public.user_links (
        github,
        twitter,
        dev_to,
        hashnode,
        codepen,
        twitch,
        stack_over_flow,
        gitlab,
        free_code_camp,
        medium,
        youtube,
        codewars,
        linked_in,
        user_id
    )
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);

-- name: UpdateUserLinks :exec
UPDATE public.user_links
SET
    github = $1,
    twitter = $2,
    dev_to = $3,
    hashnode = $4,
    codepen = $5,
    twitch = $6,
    stack_over_flow = $7,
    gitlab = $8,
    free_code_camp = $9,
    medium = $10,
    youtube = $11,
    codewars = $12,
    linked_in = $13
WHERE user_id = $14;

-- name: DeleteUserLinks :exec
DELETE FROM public.user_links WHERE user_id = $1;