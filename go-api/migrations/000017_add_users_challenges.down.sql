ALTER TABLE
    IF EXISTS "users_challenges" DROP CONSTRAINT IF EXISTS "users_challenges_challenges_challenge_id_fk";

ALTER TABLE
    IF EXISTS "users_challenges" DROP CONSTRAINT IF EXISTS "users_challenges_users_user_id_fk";

DROP TABLE IF EXISTS "users_challenges";