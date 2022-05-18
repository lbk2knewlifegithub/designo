ALTER TABLE
    IF EXISTS "user_links" DROP CONSTRAINT IF EXISTS "tags_users_users_user_id_fk";

ALTER TABLE
    IF EXISTS "user_links" DROP CONSTRAINT IF EXISTS "tags_users_tags_tag_id_fk";

DROP TABLE IF EXISTS "tags_users";