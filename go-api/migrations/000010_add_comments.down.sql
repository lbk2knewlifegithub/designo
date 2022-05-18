ALTER TABLE
    IF EXISTS "comments" DROP CONSTRAINT IF EXISTS "comments_users_user_id_fk";

ALTER TABLE
    IF EXISTS "comments" DROP CONSTRAINT IF EXISTS "comments_solutions_solution_id_fk";

ALTER TABLE
    IF EXISTS "comments" DROP CONSTRAINT IF EXISTS "comments_comments_parent_id_fk";

DROP TABLE IF EXISTS "comments";