CREATE TABLE
    public. "comments" (
        "comment_id" uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
        "user_id" uuid NOT NULL,
        "solution_id" uuid NOT NULL,
        "parent_id" uuid NULL,
        "content" VARCHAR NOT NULL,
        "reply_to" VARCHAR NOT NULL,
        "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "comments_users_user_id_fk" 
        FOREIGN KEY ("user_id") 
        REFERENCES "users" ("user_id")
        ON DELETE CASCADE
        ON UPDATE CASCADE,
        CONSTRAINT "comments_solutions_solution_id_fk" 
        FOREIGN KEY ("solution_id") 
        REFERENCES "solutions" ("solution_id")
        ON DELETE CASCADE
        ON UPDATE CASCADE,
        CONSTRAINT "comments_comments_parent_id_fk" 
        FOREIGN KEY ("parent_id") 
        REFERENCES "comments" ("comment_id")
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );


