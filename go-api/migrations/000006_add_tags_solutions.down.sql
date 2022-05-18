ALTER TABLE
    IF EXISTS "user_links" DROP CONSTRAINT IF EXISTS "tags_solutions_solutions_solution_id_fk";

ALTER TABLE
    IF EXISTS "user_links" DROP CONSTRAINT IF EXISTS "tags_solutions_tags_tag_id_fk";

DROP TABLE IF EXISTS "tags_solutions";