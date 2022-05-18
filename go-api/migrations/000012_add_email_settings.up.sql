CREATE TABLE
    public. "email_settings" (
        "user_id" uuid NOT NULL,
        "comment_on_solution" bool NOT NULL DEFAULT FALSE,
        "reply_on_comment" bool NOT NULL DEFAULT FALSE,
        "mention_in_comment" bool NOT NULL DEFAULT FALSE,
        "earn_an_archivement" bool NOT NULL DEFAULT FALSE,
        CONSTRAINT "email_settings_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users" ("user_id")
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );
