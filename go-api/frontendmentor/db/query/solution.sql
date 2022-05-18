-- name: IsSubmitted :one
SELECT 1
FROM public.solutions s
WHERE s.user_id = $1 ANDs.challenge_id = $2;

-- name: CreateSolution :one
INSERT INTO
    public.solutions(
        title,
        repo_url,
        live_site_url,
        is_private,
        questions,
        user_id,
        challenge_id
    )
VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING solution_id;

-- name: GetSolutionWithUserID :one
SELECT
    solution_id,
    s.challenge_id AS challengeID, (
        SELECT difficulty
        FROM public.challenges c
        WHERE
            c.challenge_id = s.challenge_id
    ) difficulty, (
        SELECT row_to_json(ROW)
        FROM (
            SELECT re.created_at AS createdAt, (
                    SELECT COUNT(*)
                    FROM a11y a
                    WHERE
                        a.report_id = re.report_id
                ) a11y, (
                    SELECT COUNT(*)
                    FROM html_validators hv
                    WHERE
                        hv.report_id = re.report_id
                ) htmlValidator
            FROM public.reports re
            WHERE re.solution_id = s.solution_id
            ORDER BY re.created_at DESC
            FETCH FIRST
                ROW ONLY
        ) ROW
    ) report,
    title,
    repo_url,
    live_site_url,
    screenshot,
    questions, (
        SELECT jsonb_agg(ROW.name)
        FROM (
            SELECT t.name
            FROM tags_solutions ts
                JOIN tags t USING(tag_id)
            WHERE
                ts.solution_id = s.solution_id
        ) ROW
    ) tags,
    created_at AS createdAt,
    updated_at AS updatedAt,
    is_private AS isPrivate, (
        SELECT COUNT(*)
        FROM public.likes l
        WHERE
            l.solution_id = s.solution_id
    ) likes, (
        SELECT
            CASE
                WHEN EXISTS (
                    SELECT 1
                    FROM public.likes l
                    WHERE
                        l.user_id = $1
                )
                THEN 'true':: bool
                ELSE 'false':: bool
            END
    ) is_liked, (
        SELECT COUNT(*)
        FROM public.comments c
        WHERE
            c.solution_id = s.solution_id
    ) comments, (
        SELECT
            CASE
                WHEN EXISTS (
                    SELECT 1
                    FROM public.comments c
                    WHERE
                        c.solution_id = s.solution_id AND
                        c.user_id = $1
                )
                THEN 'true':: bool
                ELSE 'false':: bool
            END
    ) is_commented, (
        SELECT COUNT(*)
        FROM public.bookmarks b
        WHERE
            b.solution_id = s.solution_id
    ) bookmarks, (
        SELECT
            CASE
                WHEN EXISTS (
                    SELECT 1
                    FROM public.bookmarks b
                    WHERE
                        b.user_id = $1
                )
                THEN 'true':: bool
                ELSE 'false':: bool
            END
    ) is_bookmarked, (
        SELECT row_to_json(ROW)
        FROM (
            SELECT
                u.user_id AS id,
                u.name,
                u.username,
                u.avatar AS avatar,
                u.avatar_github AS avatarGithub,
                COALESCE( (
                        SELECT SUM(d.points)
                        FROM
                            public.users_challenges uc
                            JOIN public.challenges c USING(challenge_id)
                            JOIN difficulties d
                            ON d.name = c.difficulty
                        WHERE
                            uc.user_id = u.user_id
                    ),
                    0
                ) points,
                u.is_premium AS isPremium
            FROM users u
            WHERE u.user_id = $1
        ) ROW
    ) USER
FROM public.solutions s
WHERE s.user_id = $1 ANDs.solution_id = $2;

-- name: GetSolution :one
SELECT
    solution_id,
    s.challenge_id AS challengeID, (
        SELECT difficulty
        FROM public.challenges c
        WHERE
            c.challenge_id = s.challenge_id
    ) difficulty, (
        SELECT row_to_json(ROW)
        FROM (
            SELECT re.created_at AS createdAt, (
                    SELECT COUNT(*)
                    FROM a11y a
                    WHERE
                        a.report_id = re.report_id
                ) a11y, (
                    SELECT COUNT(*)
                    FROM html_validators hv
                    WHERE
                        hv.report_id = re.report_id
                ) htmlValidator
            FROM public.reports re
            WHERE re.solution_id = s.solution_id
            ORDER BY re.created_at DESC
            FETCH FIRST
                ROW ONLY
        ) ROW
    ) report,
    title,
    repo_url,
    live_site_url,
    screenshot,
    questions, (
        SELECT jsonb_agg(ROW.name)
        FROM (
            SELECT t.name
            FROM tags_solutions ts
                JOIN tags t USING(tag_id)
            WHERE
                ts.solution_id = s.solution_id
        ) ROW
    ) tags,
    created_at AS createdAt,
    updated_at AS updatedAt,
    FALSE AS isPrivate, (
        SELECT COUNT(*)
        FROM public.likes l
        WHERE
            l.solution_id = s.solution_id
    ) likes,
    FALSE AS is_liked, (
        SELECT COUNT(*)
        FROM public.comments c
        WHERE
            c.solution_id = s.solution_id
    ) comments,
    FALSE AS is_commented, (
        SELECT COUNT(*)
        FROM public.bookmarks b
        WHERE
            b.solution_id = s.solution_id
    ) bookmarks,
    FALSE AS is_bookmarked, (
        SELECT row_to_json(ROW)
        FROM (
            SELECT
                u.user_id AS id,
                u.name,
                u.username,
                u.avatar AS avatar,
                u.avatar_github AS avatarGithub,
                COALESCE( (
                        SELECT SUM(d.points)
                        FROM
                            public.users_challenges uc
                            JOIN public.challenges c USING(challenge_id)
                            JOIN difficulties d
                            ON d.name = c.difficulty
                        WHERE
                            uc.user_id = u.user_id
                    ),
                    0
                ) points,
                u.is_premium AS isPremium
            FROM users u
            WHERE u.user_id = s.user_id
        ) ROW
    ) USER
FROM public.solutions s
WHERE s.solution_id = $1;

-- name: UpdateSolution :exec
UPDATE public.solutions s
SET
    title = $1,
    repo_url = $2,
    live_site_url = $3,
    is_private = $4,
    questions = $5
)
WHERE s.solution_id = $7 ANDs.user_id = $8;

-- name: DeleteSolution :exec
DELETE
FROM public.solutions s
WHERE s.user_id = $1 ANDs.solution_id = $2;

-- name: GetAllSolutions :many
SELECT
    solution_id,
    s.challenge_id AS challengeID, (
        SELECT NAME
        FROM difficulties d
        WHERE d.name = c.difficulty
    ) difficulty, (
        SELECT row_to_json(ROW)
        FROM (
            SELECT re.created_at AS createdAt, (
                    SELECT COUNT(*)
                    FROM a11y a
                    WHERE
                        a.report_id = re.report_id
                ) a11y, (
                    SELECT COUNT(*)
                    FROM html_validators hv
                    WHERE
                        hv.report_id = re.report_id
                ) htmlValidator
            FROM public.reports re
            WHERE re.solution_id = s.solution_id
            ORDER BY re.created_at DESC
            FETCH FIRST
                ROW ONLY
        ) ROW
    ) report,
    title,
    repo_url,
    live_site_url,
    screenshot,
    questions, (
        SELECT jsonb_agg(ROW.name)
        FROM (
            SELECT t.name
            FROM tags_solutions ts
                JOIN tags t USING(tag_id)
            WHERE
                ts.solution_id = s.solution_id
        ) ROW
    ) tags,
    created_at AS createdAt,
    updated_at AS updatedAt,
    FALSE AS isPrivate, (
        SELECT COUNT(*)
        FROM public.likes l
        WHERE
            l.solution_id = s.solution_id
    ) likes,
    FALSE AS is_liked, (
        SELECT COUNT(*)
        FROM public.comments c
        WHERE
            c.solution_id = s.solution_id
    ) comments,
    FALSE AS is_commented, (
        SELECT COUNT(*)
        FROM public.bookmarks b
        WHERE
            b.solution_id = s.solution_id
    ) bookmarks,
    FALSE AS is_bookmarked, (
        SELECT row_to_json(ROW)
        FROM (
            SELECT
                u.user_id AS id,
                u.name,
                u.username,
                u.avatar AS avatar,
                u.avatar_github AS avatarGithub,
                COALESCE( (
                        SELECT SUM(d.points)
                        FROM
                            public.users_challenges uc
                            JOIN public.challenges c USING(challenge_id)
                            JOIN difficulties d
                            ON d.name = c.difficulty
                        WHERE
                            uc.user_id = u.user_id
                    ),
                    0
                ) points,
                u.is_premium AS isPremium
            FROM users u
            WHERE u.user_id = s.user_id
        ) ROW
    ) USER
FROM public.solutions s;

-- name: GetAllSolutionsWithUserID :many
SELECT
    solution_id,
    s.challenge_id AS challengeID, (
        SELECT c.difficulty
        FROM challenges c
        WHERE
            c.challenge_id = s.challenge_id
    ) difficulty, (
        SELECT row_to_json(ROW)
        FROM (
            SELECT re.created_at AS createdAt, (
                    SELECT COUNT(*)
                    FROM a11y a
                    WHERE
                        a.report_id = re.report_id
                ) a11y, (
                    SELECT COUNT(*)
                    FROM html_validators hv
                    WHERE
                        hv.report_id = re.report_id
                ) htmlValidator
            FROM public.reports re
            WHERE re.solution_id = s.solution_id
            ORDER BY re.created_at DESC
            FETCH FIRST
                ROW ONLY
        ) ROW
    ) report,
    title,
    repo_url,
    live_site_url,
    screenshot,
    questions, (
        SELECT jsonb_agg(ROW.name)
        FROM (
            SELECT t.name
            FROM tags_solutions ts
                JOIN tags t USING(tag_id)
            WHERE
                ts.solution_id = s.solution_id
        ) ROW
    ) tags,
    created_at AS createdAt,
    updated_at AS updatedAt,
    is_private AS isPrivate, (
        SELECT COUNT(*)
        FROM public.likes l
        WHERE
            l.solution_id = s.solution_id
    ) likes, (
        SELECT
            CASE
                WHEN EXISTS (
                    SELECT 1
                    FROM public.likes l
                    WHERE
                        l.user_id = $1
                )
                THEN 'true':: bool
                ELSE 'false':: bool
            END
    ) is_liked, (
        SELECT COUNT(*)
        FROM public.comments c
        WHERE
            c.solution_id = s.solution_id
    ) comments, (
        SELECT
            CASE
                WHEN EXISTS (
                    SELECT 1
                    FROM public.comments c
                    WHERE
                        c.solution_id = s.solution_id AND
                        c.user_id = $1
                )
                THEN 'true':: bool
                ELSE 'false':: bool
            END
    ) is_commented, (
        SELECT COUNT(*)
        FROM public.bookmarks b
        WHERE
            b.solution_id = s.solution_id
    ) bookmarks, (
        SELECT
            CASE
                WHEN EXISTS (
                    SELECT 1
                    FROM public.bookmarks b
                    WHERE
                        b.user_id = $1
                )
                THEN 'true':: bool
                ELSE 'false':: bool
            END
    ) is_bookmarked, (
        SELECT jsonb_agg(ROW.name)
        FROM (
            SELECT l.name
            FROM public.languages l
                JOIN public.challenges c USING(challenge_id)
            WHERE
                s.challenge_id = c.challenge_id
        ) ROW
    ) languages, (
        SELECT row_to_json(ROW)
        FROM (
            SELECT
                u.user_id AS id,
                u.name,
                u.username,
                u.avatar AS avatar,
                u.avatar_github AS avatarGithub,
                COALESCE( (
                        SELECT SUM(d.points)
                        FROM
                            public.users_challenges uc
                            JOIN public.challenges c USING(challenge_id)
                            JOIN difficulties d
                            ON d.name = c.difficulty
                        WHERE
                            uc.user_id = u.user_id AND
                            uc.completed = TRUE
                    ),
                    0
                ) points,
                u.is_premium AS isPremium
            FROM users u
            WHERE u.user_id = $1
        ) ROW
    ) USER
FROM public.solutions s
WHERE s.user_id = $1;