CREATE TABLE public."solutions" (
    "solution_id" uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    "user_id" uuid NOT NULL,
    "challenge_id" uuid NOT NULL,
    "title" VARCHAR NOT NULL,
    "repo_url" VARCHAR NOT NULL,
    "live_site_url" VARCHAR NOT NULL,
    "screenshot" VARCHAR NULL,
    "questions" VARCHAR NOT NULL,
    "is_private" bool NOT NULL DEFAULT false,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "solutions_users_user_id_fk" 
    FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
    CONSTRAINT "solutions_challenges_user_id_fk" 
    FOREIGN KEY ("challenge_id") 
    REFERENCES "challenges" ("challenge_id") 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);