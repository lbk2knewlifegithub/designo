-- name: CreateUser :one
(INSERT INTO public."users" (name, username, email, avatar)
VALUES ($1, $2, $3, $4)
RETURNING user_id;

-- name: DeleteUser :exec
DELETE
FROM public.users
WHERE user_id = $1;

-- name: UpdateUser :exec
UPDATE public.users
SET NAME       = $1,
    email      = $2,
    is_hire_me = $3,
    location   = $4
WHERE user_id = $5;

-- name: GetUserIDByUsername :exec
SELECT user_id, admin
FROM public.users
WHERE username = $1;

-- name: GetUserByID :one
SELECT u.user_id AS                              id,
       u.name,
       u.username,
       u.email,
       u.avatar,
       u.avatar_github,
       u.admin,
       u.is_premium,
       u.is_hire_me,
       u.LOCATION,
       COALESCE((SELECT SUM(d.points)
                 FROM public.users_challenges uc
                          JOIN public.challenges c USING (challenge_id)
                          JOIN difficulties d
                               ON d."name" = c.difficulty
                 WHERE uc.user_id = u.user_id),
                0
           )                                     points,
       (SELECT row_to_json(ROW)
        FROM (SELECT b.website,
                     b.current_learning,
                     b.content
              FROM bio b
              WHERE b.user_id = u.user_id) ROW)  bio,
       (SELECT row_to_json(ROW)
        FROM (SELECT es.comment_on_solution AS commentOnSolution,
                     es.reply_on_comment    AS replyOnComment,
                     es.mention_in_comment  AS mentionInComment,
                     es.earn_an_archivement AS earnAnArchivement
              FROM email_settings es
              WHERE es.user_id = u.user_id) ROW) email_settings,
       (SELECT row_to_json(ROW)
        FROM (SELECT l.github,
                     l.twitter,
                     l.dev_to,
                     l.hashnode,
                     l.codepen,
                     l.twitch,
                     l.stack_over_flow,
                     l.gitlab,
                     l.free_code_camp,
                     l.medium,
                     l.youtube,
                     l.codewars
              FROM user_links l
              WHERE l.user_id = u.user_id) ROW)  links
FROM public.users u
WHERE u.user_id = $1;