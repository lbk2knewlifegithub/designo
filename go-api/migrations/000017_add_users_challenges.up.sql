CREATE TABLE
    public. "users_challenges" (
        "user_id" uuid NOT NULL,
        "challenge_id" uuid NOT NULL,
        "completed" bool NOT NULL DEFAULT FALSE,
        -- Challenge ID Foreign Key
        CONSTRAINT "users_challenges_challenges_challenge_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "challenges" ("challenge_id")
        ON
        DELETE CASCADE
            ON
        UPDATE
            CASCADE,
            -- User ID Foreign Key
            CONSTRAINT "users_challenges_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users" ("user_id")
            ON
        DELETE CASCADE
            ON
        UPDATE
            CASCADE,
            -- usere_id and challenge_id primary key
            CONSTRAINT "users_challenges_user_id_challenge_id" PRIMARY KEY ("user_id", "challenge_id")
    );