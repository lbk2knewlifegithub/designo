CREATE TABLE
    public. "bio" (
        "user_id" uuid NOT NULL,
        "website" VARCHAR NULL,
        "current_learning" VARCHAR NULL,
        "content" VARCHAR NULL,
        CONSTRAINT "bio_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users" ("user_id")
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );