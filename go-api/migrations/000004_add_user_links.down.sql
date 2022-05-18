ALTER TABLE
    IF EXISTS "user_links" DROP CONSTRAINT IF EXISTS "user_links_users_user_id_fk";

DROP TABLE IF EXISTS "user_links";