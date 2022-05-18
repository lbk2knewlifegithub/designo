ALTER TABLE
    IF EXISTS "likes" DROP CONSTRAINT IF EXISTS "likes_solutions_solution_id_fk";

ALTER TABLE
    IF EXISTS "likes" DROP CONSTRAINT IF EXISTS "likes_users_user_id_fk";

DROP TABLE IF EXISTS "likes";