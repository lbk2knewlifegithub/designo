-- name: IsTakeChallenge :one
SELECT 1
FROM public.users_challenges uc
WHERE uc.user_id = $1
  AND uc.challenge_id = $2;

-- name: StartChallenge :one
INSERT INTO public.users_challenges(user_id, challenge_id)
VALUES ($1, $2);

-- name: CreateChallenge :one
INSERT INTO public.challenges(steps,
                              ideas,
                              brief,
                              title,
                              hero_image,
                              description,
                              starter_url,
                              type,
                              difficulty)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING challenge_id;

-- name: GetChallenge :one
SELECT challenge_id,
       (SELECT COUNT(*)
        FROM public.users_challenges uc
        WHERE uc.challenge_id = $1) as                    started_count,
       (SELECT COUNT(*)
        FROM public.users_challenges uc
        WHERE uc.completed = TRUE
          AND uc.challenge_id = $1) as                    completed_count,
       title,
       hero_image,
       description,
       brief,
       created_at,
       updated_at,
       starter_url,
       type,
       difficulty,
       steps,
       ideas,
       (SELECT jsonb_agg(ROW.name)
        FROM (SELECT l.name
              FROM public."languages" l
              WHERE l.challenge_id = c.challenge_id) ROW) languages,
       (SELECT jsonb_agg(ROW)
        FROM (SELECT i.preview, i.design, i.title
              FROM public."challenge_images" i
              WHERE i.challenge_id = c.challenge_id) ROW) gallery
FROM public.challenges AS c
WHERE c.challenge_id = $1;

-- name: GetChallengeWithUserID :one
SELECT challenge_id,
       (SELECT COUNT(*)
        FROM public.users_challenges uc
        WHERE uc.challenge_id = $1)                       started_count,
       (SELECT COUNT(*)
        FROM public.users_challenges uc
        WHERE uc.completed = TRUE
          AND uc.challenge_id = $1)                       completed_count,
       title,
       hero_image,
       description,
       brief,
       created_at,
       updated_at,
       starter_url,
       type,
       difficulty,
       steps,
       ideas,
       (SELECT jsonb_agg(ROW.name)
        FROM (SELECT l.name
              FROM public.languages l
              WHERE l.challenge_id = c.challenge_id) ROW) languages,
       (SELECT jsonb_agg(ROW)
        FROM (SELECT i.preview, i.design, i.title
              FROM public.images i
              WHERE i.challenge_id = c.challenge_id) ROW) gallery,
       (SELECT CASE
                   WHEN completed = TRUE
                       THEN 'completed'
                   WHEN completed = FALSE
                       THEN 'in-progress'
                   ELSE NULL
                   END AS status
        FROM public.users_challenges uc
        WHERE uc.user_id = $2
          AND uc.challenge_id = c.challenge_id)           status
FROM public.challenges AS c
WHERE c.challenge_id = $1;

-- name: GetAllChallengesWithUserID :many
SELECT challenge_id,
       (SELECT COUNT(*)
        FROM public.users_challenges uc
        WHERE uc.challenge_id = c.challenge_id)           started_count,
       (SELECT COUNT(*)
        FROM public.users_challenges uc
        WHERE uc.completed = TRUE
          AND uc.challenge_id = c.challenge_id)           completed_count,
       title,
       hero_image,
       description,
       brief,
       created_at,
       updated_at,
       starter_url,
       type,
       difficulty,
       steps,
       ideas,
       (SELECT jsonb_agg(ROW.name)
        FROM (SELECT l.name
              FROM public.languages l
              WHERE l.challenge_id = c.challenge_id) ROW) languages,
       (SELECT jsonb_agg(ROW)
        FROM (SELECT i.preview, i.design, i.title
              FROM public.images i
              WHERE i.challenge_id = c.challenge_id) ROW) gallery,
       (SELECT CASE
                   WHEN completed = TRUE
                       THEN 'completed'
                   WHEN completed = FALSE
                       THEN 'in-progress'
                   ELSE NULL
                   END AS status
        FROM public.users_challenges uc
        WHERE uc.user_id = $1
          AND uc.challenge_id = c.challenge_id)           status
FROM public.challenges AS c;

-- name: GetAllChallenges :many
SELECT challenge_id,
       (SELECT COUNT(*)
        FROM public.users_challenges uc
        WHERE uc.challenge_id = c.challenge_id)           started_count,
       (SELECT COUNT(*)
        FROM public.users_challenges uc
        WHERE uc.completed = TRUE
          AND uc.challenge_id = c.challenge_id)           completed_count,
       title,
       hero_image,
       description,
       brief,
       created_at,
       updated_at,
       starter_url,
       TYPE,
       difficulty,
       steps,
       ideas,
       (SELECT jsonb_agg(ROW.name)
        FROM (SELECT l.name
              FROM public.languages l
              WHERE l.challenge_id = c.challenge_id) ROW) languages,
       (SELECT jsonb_agg(ROW)
        FROM (SELECT i.preview, i.design, i.title
              FROM public.images i
              WHERE i.challenge_id = c.challenge_id) ROW) gallery
FROM public.challenges AS c;