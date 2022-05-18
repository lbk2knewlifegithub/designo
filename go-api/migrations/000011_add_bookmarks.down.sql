ALTER TABLE
    IF EXISTS "bookmarks" DROP CONSTRAINT IF EXISTS "bookmarks_solutions_solution_id_fk";

ALTER TABLE
    IF EXISTS "bookmarks" DROP CONSTRAINT IF EXISTS "bookmarks_users_user_id_fk";

DROP TABLE IF EXISTS "bookmarks";