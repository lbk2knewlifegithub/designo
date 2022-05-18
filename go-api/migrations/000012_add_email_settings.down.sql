ALTER TABLE
    IF EXISTS "email_settings" DROP CONSTRAINT IF EXISTS "email_settings_users_user_id_fk";

DROP TABLE IF EXISTS "email_settings";